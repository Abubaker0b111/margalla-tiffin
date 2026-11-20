export function formatRs(amount) {
  return `Rs ${amount.toLocaleString('en-US')}`;
}

export const SPICE_LABELS = { 1: 'Mild', 2: 'Medium', 3: 'Hot' };

// Returns { text, level } so the UI can show words as well as colour.
export function stockInfo(stock) {
  if (stock <= 0) return { text: 'Sold out', level: 'sold' };
  if (stock <= 3) return { text: `Only ${stock} left`, level: 'low' };
  return { text: `${stock} available today`, level: 'ok' };
}
