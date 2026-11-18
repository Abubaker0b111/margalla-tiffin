import meals from '../data/meals.js';

// Mock asynchronous loader. It pretends to be a network request.
// options.fail      -> reject with an error (loading failure demo)
// options.empty     -> resolve with no meals (empty dataset demo)
// options.stockDrop -> lower stock to 1 and sell out m4 (changed availability demo)
export function loadMeals({ fail = false, empty = false, stockDrop = false } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) {
        reject(new Error('We could not load the menu. This is a simulated failure.'));
      } else if (empty) {
        resolve([]);
      } else if (stockDrop) {
        resolve(meals.map((m) => ({ ...m, stock: m.id === 'm4' ? 0 : Math.min(m.stock, 1) })));
      } else {
        resolve(meals);
      }
    }, 700);
  });
}
