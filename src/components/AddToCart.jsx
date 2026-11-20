import { useStore } from '../context/StoreContext.jsx';
import { lineIssue } from '../rules/orderRules.js';
import QuantityControl from './QuantityControl.jsx';

// Shows "Add to cart" before the meal is selected, and quantity controls after.
// Used on both the menu cards and the details page so they always agree (FR08).
export default function AddToCart({ meal }) {
  const { cart, addToCart, setQuantity, removeFromCart } = useStore();
  const item = cart.find((i) => i.id === meal.id);

  if (!item) {
    if (meal.stock <= 0) {
      return (
        <button type="button" className="btn btn-primary" disabled>
          Sold out
        </button>
      );
    }
    return (
      <button
        type="button"
        className="btn btn-primary"
        aria-label={`Add ${meal.name} to cart`}
        onClick={() => addToCart(meal.id)}
      >
        Add to cart
      </button>
    );
  }

  return (
    <div className="add-group">
      <QuantityControl
        meal={meal}
        quantity={item.quantity}
        error={lineIssue(item.quantity, meal)}
        onChange={(quantity) => setQuantity(meal.id, quantity)}
      />
      <button type="button" className="btn btn-link" onClick={() => removeFromCart(meal.id)}>
        Remove<span className="visually-hidden"> {meal.name} from cart</span>
      </button>
    </div>
  );
}
