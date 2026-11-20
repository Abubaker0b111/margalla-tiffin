import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { MIN_ORDER } from '../rules/orderRules.js';
import { formatRs } from '../utils/format.js';

// Mini summary shown under the menu so the running total and minimum are always visible.
export default function CartBar() {
  const { itemCount, totals, prefs } = useStore();

  if (itemCount === 0) return null;

  return (
    <section className="cart-bar" aria-label="Your order so far">
      <div>
        <p className="cart-bar-main">
          {itemCount} {itemCount === 1 ? 'item' : 'items'} - Subtotal {formatRs(totals.subtotal)}
          {prefs.fulfilment === 'delivery' && ` - Delivery ${totals.deliveryFee === 0 ? 'free' : formatRs(totals.deliveryFee)}`}
        </p>
        <p className={totals.meetsMinimum ? 'ok-text' : 'warn-text'}>
          {totals.meetsMinimum
            ? 'Minimum order reached'
            : `Add ${formatRs(totals.shortBy)} more to reach the ${formatRs(MIN_ORDER)} minimum`}
        </p>
      </div>
      <Link to="/cart" className="btn btn-primary">View cart</Link>
    </section>
  );
}
