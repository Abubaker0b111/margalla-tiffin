import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartSummary from '../components/CartSummary.jsx';
import FormField from '../components/FormField.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { nutMeals } from '../rules/orderRules.js';
import { validateCheckout } from '../rules/validateCheckout.js';

export default function CheckoutPage() {
  const { lines, totals, hasIssues, prefs, placeOrder, removeMeals, menuSearch } = useStore();
  const navigate = useNavigate();

  // Controlled form: every field's value lives in state, so errors never clear valid input.
  const [form, setForm] = useState({ name: '', phone: '', address: '', nutFree: false, notes: '' });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validateCheckout(form, { lines, totals, hasIssues, fulfilment: prefs.fulfilment });
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // Only the order summary is saved. Name, phone, and address are never stored.
    const order = {
      id: `MTC-${Math.floor(1000 + Math.random() * 9000)}`,
      items: lines.map((line) => ({ name: line.meal.name, quantity: line.quantity, price: line.meal.price })),
      ...totals,
      fulfilment: prefs.fulfilment,
      area: prefs.area,
      nutFree: form.nutFree,
    };
    placeOrder(order);
    navigate('/confirmation');
  }

  if (lines.length === 0) {
    return (
      <div className="container section">
        <h1>Checkout</h1>
        <div className="status-box">
          <p>Your cart is empty, so there is nothing to check out.</p>
          <Link className="btn btn-primary" to={`/menu${menuSearch}`}>Browse the menu</Link>
        </div>
      </div>
    );
  }

  const delivering = prefs.fulfilment === 'delivery';
  const errorList = Object.values(errors);

  return (
    <div className="container section">
      <h1>Checkout</h1>
      <p className="notice info">
        <strong>Simulated order.</strong> Use made-up details. Nothing is stored, sent, or charged.
      </p>

      {errorList.length > 0 && (
        <div className="notice error" role="alert">
          <p><strong>Please fix {errorList.length === 1 ? 'this problem' : 'these problems'} to place your order:</strong></p>
          <ul>
            {errorList.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
          {errors.cart && <Link to="/cart">Go back to your cart</Link>}
          {errors.nutFree && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                removeMeals(nutMeals(lines).map((meal) => meal.id));
                setErrors({});
              }}
            >
              Remove the nut items from my cart
            </button>
          )}
        </div>
      )}

      <div className="cart-layout">
        <form onSubmit={handleSubmit} noValidate>
          <h2>Your details</h2>
          <FormField id="name" label="Full name" value={form.name} onChange={handleChange} error={errors.name} autoComplete="off" />
          <FormField
            id="phone"
            label="Mobile number"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
            hint="Format: 0300-1234567"
            inputMode="tel"
            autoComplete="off"
          />
          {delivering && (
            <FormField
              id="address"
              as="textarea"
              rows={3}
              label={`Delivery address in ${prefs.area}`}
              value={form.address}
              onChange={handleChange}
              error={errors.address}
            />
          )}
          <div className="field">
            <label className="check">
              <input type="checkbox" name="nutFree" checked={form.nutFree} onChange={handleChange} />
              I need a nut-free order
            </label>
            <p className="hint">If ticked, meals that contain nuts cannot be in your order.</p>
            {errors.nutFree && (
              <p className="field-error"><strong>Error:</strong> {errors.nutFree}</p>
            )}
          </div>
          <FormField id="notes" as="textarea" rows={2} maxLength={200} label="Notes for the kitchen (optional)" value={form.notes} onChange={handleChange} />

          <button type="submit" className="btn btn-primary btn-large">Place simulated order</button>
        </form>

        <CartSummary>
          <p className="hint">
            <Link to="/cart">Edit your cart</Link>
          </p>
        </CartSummary>
      </div>
    </div>
  );
}
