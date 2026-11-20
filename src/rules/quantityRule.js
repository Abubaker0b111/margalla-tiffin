// RULE 1 (availability / capacity)
// A customer may order 1 to 6 portions of the same meal in one order,
// and never more than the portions we have left today.

export const MAX_PER_MEAL = 6;

export function checkQuantity(quantity, stock) {
  const max = Math.min(MAX_PER_MEAL, Math.max(0, stock));

  if (!Number.isInteger(quantity)) {
    return { valid: false, max, message: 'Enter a whole number.' };
  }
  if (stock <= 0) {
    return { valid: false, max, message: 'Sold out right now.' };
  }
  if (quantity < 1) {
    return { valid: false, max, message: 'Minimum quantity is 1.' };
  }
  if (quantity > MAX_PER_MEAL) {
    return { valid: false, max, message: `Maximum ${MAX_PER_MEAL} per meal in one order.` };
  }
  if (quantity > stock) {
    return { valid: false, max, message: `Only ${stock} left.` };
  }
  return { valid: true, max, message: '' };
}
