import { MAX_PER_MEAL } from '../rules/quantityRule.js';

// Quantity input with - and + buttons. The limit is shown right beside it (Rule 1).
// "error" is the message from the rule check; the parent decides what the new quantity does.
export default function QuantityControl({ meal, quantity, error, onChange }) {
  const max = Math.min(MAX_PER_MEAL, meal.stock);
  const inputId = `qty-${meal.id}`;
  const limitText =
    meal.stock < MAX_PER_MEAL ? `Limit ${max} per order (only ${meal.stock} left)` : `Limit ${max} per order`;

  return (
    <div className="qty-group">
      <div className="qty">
        <button
          type="button"
          className="btn btn-secondary qty-btn"
          aria-label={`Decrease quantity of ${meal.name}`}
          onClick={() => onChange(quantity - 1)}
          disabled={quantity <= 1}
        >
          -
        </button>
        <label htmlFor={inputId} className="visually-hidden">
          Quantity of {meal.name}
        </label>
        <input
          id={inputId}
          type="number"
          inputMode="numeric"
          value={quantity}
          onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={`${inputId}-hint`}
        />
        <button
          type="button"
          className="btn btn-secondary qty-btn"
          aria-label={`Increase quantity of ${meal.name}`}
          onClick={() => onChange(quantity + 1)}
          disabled={quantity >= max}
        >
          +
        </button>
      </div>
      <p className="hint" id={`${inputId}-hint`}>{limitText}</p>
      {error && (
        <p className="field-error">
          <strong>Problem:</strong> {error}
        </p>
      )}
    </div>
  );
}
