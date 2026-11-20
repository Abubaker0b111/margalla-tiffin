import { MIN_ORDER, nutMeals } from './orderRules.js';

// Returns an object of error messages keyed by field. An empty object means valid.
export function validateCheckout(form, { lines, totals, hasIssues, fulfilment }) {
  const errors = {};

  if (form.name.trim().length < 2) {
    errors.name = 'Enter your name (at least 2 characters).';
  }
  if (!/^03\d{2}-?\d{7}$/.test(form.phone.trim())) {
    errors.phone = 'Enter a Pakistani mobile number like 0300-1234567.';
  }
  if (fulfilment === 'delivery' && form.address.trim().length < 10) {
    errors.address = 'Enter your delivery address (at least 10 characters).';
  }
  if (form.nutFree) {
    const names = nutMeals(lines).map((meal) => meal.name);
    if (names.length > 0) {
      errors.nutFree = `A nut-free order cannot include: ${names.join(', ')}.`;
    }
  }

  if (lines.length === 0) {
    errors.cart = 'Your cart is empty.';
  } else if (hasIssues) {
    errors.cart = 'Some cart items are unavailable. Fix your cart first.';
  } else if (!totals.meetsMinimum) {
    errors.cart = `Minimum order is Rs ${MIN_ORDER}. Add Rs ${totals.shortBy} more.`;
  }

  return errors;
}
