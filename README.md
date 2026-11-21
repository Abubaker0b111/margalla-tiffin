# Margalla Tiffin Co.

**Student:** Muhammad Abubaker Rashid | **Roll no.:** 24i-2024 | **Section:** CY-C
**Course:** CS4032 Web Programming, Assignment 02 (Fall 2026), FAST-NUCES Islamabad

## Description

Margalla Tiffin Co. is a fictional meal-prep business for university students in Islamabad. Customers browse
individual meals, weekly bundles, and sides, compare them, build an order, and get a simulated confirmation.
Orders are collected from a kitchen counter in H-11 or delivered to H-11, H-12, G-11, or I-8.

All orders are **simulated**. No payment, no backend, and no personal details are stored or sent.

## Links

- GitHub: [View Repository](https://github.com/Abubaker0b111/margalla-tiffin)
- Live site: [Click to View](https://margalla-tiffin.vercel.app/)
- Final commit: View Report

## Commands

```bash
npm install        # install dependencies
npm run dev        # development server (http://localhost:5173)
npm run build      # production build into dist/
npm run preview    # serve the production build locally
npm test           # runs: node --test  (business rule tests)
```

Requires Node.js 20 or newer.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home: what the business offers, charges, and limits |
| `/menu` | Browse, search, filter, sort; filters are kept in the URL |
| `/meals/:id` | Meal details; an invalid ID shows a "not found" message |
| `/cart` | Edit quantities, choose collection or delivery, see totals |
| `/checkout` | Validated form, then a simulated order |
| `/confirmation` | Final order summary |

## Features

- 14 meals, bundles, and sides loaded from local data through an asynchronous mock loader
- Search + category filter + vegetarian filter + sort, all working together
- Cart with quantity changes, saved in local storage and checked again when restored
- Calculated summary: item count, subtotal, delivery fee, total, minimum-order progress
- Controlled checkout form with specific validation messages
- Loading, error (with retry), empty menu, and no-match states
- Keyboard access, visible focus, labelled inputs, text next to status colours

## Operating rules

1. **Availability:** 1 to 6 of the same meal per order, and never more than the portions left (`src/rules/quantityRule.js`).
2. **Eligibility:** a nut-free order cannot contain meals that contain nuts (`src/rules/orderRules.js`, `validateCheckout.js`).
3. **Pricing / fulfilment:** minimum order Rs 500; delivery Rs 150, free from Rs 2,000; delivery only to H-11, H-12, G-11, I-8 (`src/rules/orderRules.js`).

## Reproducing edge cases

Open the **Demo controls** panel in the page footer.

| Case | How to reproduce |
| --- | --- |
| Loading failure | Click "Simulate a loading failure". The error appears; click "Try again" to recover. |
| Empty menu | Tick "Simulate an empty menu" and open `/menu`. Untick to restore. |
| Changed availability | Add 3 of any meal to the cart, tick "Simulate a stock drop", open `/cart`. Use "Fix my cart automatically". |
| No search matches | On `/menu` search for `zzzz`, then click "Clear all filters". |
| Invalid meal ID | Open `/meals/nope`. |
| Unknown page | Open `/anything/else`. |
| Missing image | "Chana Chaat Cup" has no photo and shows the fallback. |
| Long name | Open `/meals/b3`. |
| Rule 1 boundary | In the cart type 6 (accepted) then 7 (message, checkout disabled). |
| Rule 3 boundary | Subtotal Rs 499 is blocked; Rs 500 is accepted. Rs 1,999 pays delivery; Rs 2,000 does not. |
| Rule 2 | Add "Almond Halwa Cup", tick "I need a nut-free order", submit. |
| Local storage reset | In DevTools: `localStorage.clear()` then reload. |

## Simulated operations and known limitations

- Placing an order only shows a confirmation. Nothing is sent or charged.
- Name, phone, and address are never saved. Only the order summary is kept so the confirmation survives a refresh.
- Stock is fixed local data. Real stock would need a backend.
- Photos are original SVG illustrations, one per category.

## Concept map

| Concept | File | Component / function |
| --- | --- | --- |
| Routing, URL params | `src/App.jsx`, `src/pages/MealDetailsPage.jsx` | `Routes`, `useParams` |
| Shared state | `src/context/StoreContext.jsx` | `StoreProvider`, `useStore` |
| Functional updates, immutable arrays | `src/context/StoreContext.jsx` | `addToCart`, `setQuantity`, `removeFromCart`, `fixCart` |
| Immutable object update | `src/pages/CheckoutPage.jsx` | `handleChange` |
| Controlled form | `src/pages/CheckoutPage.jsx`, `src/components/FormField.jsx` | `CheckoutPage`, `FormField` |
| Validation | `src/rules/validateCheckout.js` | `validateCheckout` |
| Props and callback props | `src/components/QuantityControl.jsx`, `AddToCart.jsx` | `onChange` |
| Derived values | `src/context/StoreContext.jsx` | `lines`, `subtotal`, `totals` |
| useEffect with cleanup | `src/context/StoreContext.jsx` | menu loading effect (`cancelled` flag) |
| Async code and failure handling | `src/services/loadMeals.js` | `loadMeals` (Promise, `.then`/`.catch`) |
| Local storage | `src/context/StoreContext.jsx` | `readStorage`, `writeStorage` |
| Search, filter, sort | `src/pages/MenuPage.jsx` | `filter`, `sort`, `SORTERS` |
| Filters kept in URL | `src/pages/MenuPage.jsx` | `useSearchParams` effect |
| Conditional rendering | `src/components/DataGate.jsx`, `MenuPage.jsx` | loading / error / empty states |
| Lists and keys | `src/pages/MenuPage.jsx` | `shown.map` with `key={meal.id}` |
| Business rule + test | `src/rules/quantityRule.js`, `tests/quantityRule.test.js` | `checkQuantity` |
