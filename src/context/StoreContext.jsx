import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { loadMeals } from '../services/loadMeals.js';
import { calculateTotals, lineIssue } from '../rules/orderRules.js';
import { checkQuantity } from '../rules/quantityRule.js';

// One shared store: menu data, cart, fulfilment preferences, and demo switches.
const StoreContext = createContext(null);

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be blocked (private mode). The app still works without it.
  }
}

// Saved data can be old or edited by hand, so keep only well-formed cart items.
function readCart() {
  const saved = readStorage('mtc-cart', []);
  if (!Array.isArray(saved)) return [];
  return saved.filter((item) => item && typeof item.id === 'string' && Number.isFinite(item.quantity));
}

export function StoreProvider({ children }) {
  // Menu data loading state (FR14)
  const [meals, setMeals] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const failNextRef = useRef(false);

  // Saved in local storage (FR13)
  const [cart, setCart] = useState(readCart); // [{ id, quantity }]
  const [prefs, setPrefs] = useState(() => readStorage('mtc-prefs', { fulfilment: 'collect', area: 'H-11' }));
  const [demo, setDemo] = useState(() => readStorage('mtc-demo', { emptyMenu: false, stockDrop: false }));
  const [lastOrder, setLastOrder] = useState(() => readStorage('mtc-last-order', null));

  // Remembers the menu's filters so the header link does not reset them.
  const [menuSearch, setMenuSearch] = useState('');

  // Load the menu. Runs again when the user retries or a demo switch changes.
  useEffect(() => {
    let cancelled = false; // cleanup: ignore a result that arrives after a newer load started
    setStatus('loading');
    const options = { fail: failNextRef.current, empty: demo.emptyMenu, stockDrop: demo.stockDrop };
    failNextRef.current = false; // a failure happens once, so Retry works

    loadMeals(options)
      .then((data) => {
        if (cancelled) return;
        setMeals(data);
        setStatus('ready');
      })
      .catch((error) => {
        if (cancelled) return;
        setErrorMessage(error.message);
        setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [reloadKey, demo]);

  useEffect(() => writeStorage('mtc-cart', cart), [cart]);
  useEffect(() => writeStorage('mtc-prefs', prefs), [prefs]);
  useEffect(() => writeStorage('mtc-demo', demo), [demo]);
  useEffect(() => writeStorage('mtc-last-order', lastOrder), [lastOrder]);

  // Cart actions. Each one builds a new array instead of changing the old one.
  function addToCart(id) {
    setCart((prev) => (prev.some((item) => item.id === id) ? prev : [...prev, { id, quantity: 1 }]));
  }

  function setQuantity(id, quantity) {
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function removeMeals(ids) {
    setCart((prev) => prev.filter((item) => !ids.includes(item.id)));
  }

  // Repairs the cart after stock or the menu changed.
  function fixCart() {
    setCart((prev) =>
      prev.flatMap((item) => {
        const meal = meals.find((m) => m.id === item.id);
        if (!meal || meal.stock <= 0) return []; // drop missing or sold-out items
        const { max } = checkQuantity(1, meal.stock);
        return [{ ...item, quantity: Math.min(Math.max(1, item.quantity), max) }];
      })
    );
  }

  function updatePrefs(changes) {
    setPrefs((prev) => ({ ...prev, ...changes }));
  }

  function placeOrder(order) {
    setLastOrder(order);
    setCart([]);
  }

  // Demo controls (documented in the README)
  function updateDemo(changes) {
    setDemo((prev) => ({ ...prev, ...changes }));
  }

  function reload() {
    setReloadKey((key) => key + 1);
  }

  function simulateFailure() {
    failNextRef.current = true;
    reload();
  }

  // Derived values: calculated from current data, never stored.
  const lines = cart.map((item) => {
    const meal = meals.find((m) => m.id === item.id);
    return { ...item, meal, issue: lineIssue(item.quantity, meal) };
  });
  const hasIssues = lines.some((line) => line.issue !== '');
  const itemCount = lines.reduce((sum, line) => (line.meal ? sum + Math.max(0, line.quantity) : sum), 0);
  const subtotal = lines.reduce(
    (sum, line) => (line.meal ? sum + line.meal.price * Math.max(0, line.quantity) : sum),
    0
  );
  const totals = calculateTotals(subtotal, prefs.fulfilment);

  const value = {
    meals, status, errorMessage, reload, simulateFailure,
    cart, lines, hasIssues, itemCount, totals,
    addToCart, setQuantity, removeFromCart, removeMeals, fixCart,
    prefs, updatePrefs, lastOrder, placeOrder,
    demo, updateDemo, menuSearch, setMenuSearch,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  return useContext(StoreContext);
}
