import { checkQuantity } from './quantityRule.js';

// RULE 3 (pricing / fulfilment): minimum order, delivery fee, service areas.
export const MIN_ORDER = 500; // subtotal must be at least Rs 500
export const DELIVERY_FEE = 150; // delivery costs Rs 150 ...
export const FREE_DELIVERY_FROM = 2000; // ... unless the subtotal is Rs 2,000 or more
export const DELIVERY_AREAS = ['H-11', 'H-12', 'G-11', 'I-8'];

// Returns an error message for one cart line, or '' when the line is fine.
export function lineIssue(quantity, meal) {
  if (!meal) return 'This item is no longer on the menu.';
  const result = checkQuantity(quantity, meal.stock);
  return result.valid ? '' : result.message;
}

export function calculateTotals(subtotal, fulfilment) {
  const chargeDelivery = fulfilment === 'delivery' && subtotal > 0 && subtotal < FREE_DELIVERY_FROM;
  const deliveryFee = chargeDelivery ? DELIVERY_FEE : 0;
  return {
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    meetsMinimum: subtotal >= MIN_ORDER,
    shortBy: Math.max(0, MIN_ORDER - subtotal),
    freeDeliveryLeft: Math.max(0, FREE_DELIVERY_FROM - subtotal),
  };
}

// RULE 2 (eligibility / compatibility): a nut-free order cannot contain nut meals.
export function nutMeals(lines) {
  return lines.filter((line) => line.meal && line.meal.containsNuts).map((line) => line.meal);
}
