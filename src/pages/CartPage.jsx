import { Link } from 'react-router-dom';
import CartSummary from '../components/CartSummary.jsx';
import MealImage from '../components/MealImage.jsx';
import QuantityControl from '../components/QuantityControl.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { formatRs } from '../utils/format.js';

export default function CartPage() {
  const { lines, hasIssues, totals, menuSearch, setQuantity, removeFromCart, fixCart } = useStore();

  if (lines.length === 0) {
    return (
      <div className="container section">
        <h1>Your cart</h1>
        <div className="status-box">
          <p>Your cart is empty. Pick a few meals to get started.</p>
          <Link className="btn btn-primary" to={`/menu${menuSearch}`}>Browse the menu</Link>
        </div>
      </div>
    );
  }

  const canCheckout = !hasIssues && totals.meetsMinimum;

  return (
    <div className="container section">
      <h1>Your cart</h1>

      {/* Restored or changed selections are checked against current data (Edge case) */}
      {hasIssues && (
        <div className="notice error" role="alert">
          <p><strong>Some items in your cart changed.</strong> Stock or the menu is different from when you added them.</p>
          <button type="button" className="btn btn-secondary" onClick={fixCart}>
            Fix my cart automatically
          </button>
          <p className="hint">This lowers quantities to what is available and removes sold-out or missing items. You can also edit each item yourself.</p>
        </div>
      )}

      <div className="cart-layout">
        <ul className="cart-list">
          {lines.map((line) => (
            <li key={line.id} className="cart-line">
              {line.meal ? (
                <>
                  <MealImage meal={line.meal} className="cart-image" />
                  <div className="cart-line-main">
                    <h2 className="cart-line-title">
                      <Link to={`/meals/${line.id}`}>{line.meal.name}</Link>
                    </h2>
                    <p>{formatRs(line.meal.price)} each</p>
                    <QuantityControl
                      meal={line.meal}
                      quantity={line.quantity}
                      error={line.issue}
                      onChange={(quantity) => setQuantity(line.id, quantity)}
                    />
                  </div>
                  <div className="cart-line-side">
                    <p className="line-total">{formatRs(line.meal.price * Math.max(0, line.quantity))}</p>
                    <button type="button" className="btn btn-link" onClick={() => removeFromCart(line.id)}>
                      Remove<span className="visually-hidden"> {line.meal.name}</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="cart-line-main">
                  <h2 className="cart-line-title">Unknown item ({line.id})</h2>
                  <p className="field-error"><strong>Problem:</strong> {line.issue}</p>
                  <button type="button" className="btn btn-link" onClick={() => removeFromCart(line.id)}>
                    Remove this item
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>

        <CartSummary>
          {canCheckout ? (
            <Link className="btn btn-primary btn-block" to="/checkout">Continue to checkout</Link>
          ) : (
            <button type="button" className="btn btn-primary btn-block" disabled>
              Continue to checkout
            </button>
          )}
          {!canCheckout && (
            <p className="hint">Checkout is turned off until the problems above are fixed.</p>
          )}
        </CartSummary>
      </div>
    </div>
  );
}
