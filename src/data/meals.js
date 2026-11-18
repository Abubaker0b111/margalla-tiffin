// Local menu data for Margalla Tiffin Co. Every record has a stable string id.
// stock = portions left today. spice: 1 = mild, 2 = medium, 3 = hot.

const art = {
  Meals: { image: '/images/bowl.svg', imageAlt: 'Illustration of a bowl of food' },
  'Weekly bundles': { image: '/images/box.svg', imageAlt: 'Illustration of a lunchbox with several compartments' },
  'Sides & drinks': { image: '/images/cup.svg', imageAlt: 'Illustration of a cup with a straw' },
};

const meals = [
  {
    id: 'm1', name: 'Chicken Karahi Rice Box', category: 'Meals', unit: 'meal', price: 450, calories: 620,
    spice: 2, vegetarian: false, containsNuts: false, stock: 12, tags: ['chicken', 'karahi', 'rice'],
    description: 'Tender chicken karahi with tomato and ginger, served over steamed rice with a mint raita.',
    ingredients: ['Chicken', 'Tomato', 'Ginger', 'Green chilli', 'Basmati rice', 'Yogurt'],
    ...art.Meals,
  },
  {
    id: 'm2', name: 'Daal Chawal Comfort Bowl', category: 'Meals', unit: 'meal', price: 320, calories: 540,
    spice: 1, vegetarian: true, containsNuts: false, stock: 15, tags: ['daal', 'lentils', 'rice', 'comfort'],
    description: 'Slow-cooked masoor daal with a garlic tarka, steamed rice, and a pickled onion side.',
    ingredients: ['Red lentils', 'Garlic', 'Cumin', 'Basmati rice', 'Onion'],
    ...art.Meals,
  },
  {
    id: 'm3', name: 'Keema Paratha Wrap', category: 'Meals', unit: 'meal', price: 380, calories: 580,
    spice: 2, vegetarian: false, containsNuts: false, stock: 10, tags: ['beef', 'keema', 'paratha', 'wrap'],
    description: 'Spiced beef keema rolled in a flaky whole-wheat paratha. Easy to eat between classes.',
    ingredients: ['Beef mince', 'Whole-wheat flour', 'Peas', 'Coriander', 'Garam masala'],
    ...art.Meals,
  },
  {
    id: 'm4', name: 'Chicken Biryani Box', category: 'Meals', unit: 'meal', price: 420, calories: 680,
    spice: 2, vegetarian: false, containsNuts: false, stock: 8, tags: ['chicken', 'biryani', 'rice'],
    description: 'Layered biryani with marinated chicken, fried onions, and a cooling raita.',
    ingredients: ['Chicken', 'Basmati rice', 'Yogurt', 'Fried onion', 'Biryani masala'],
    ...art.Meals,
  },
  {
    id: 'm5', name: 'Palak Paneer with Roti', category: 'Meals', unit: 'meal', price: 400, calories: 520,
    spice: 1, vegetarian: true, containsNuts: false, stock: 9, tags: ['paneer', 'spinach', 'roti', 'vegetarian'],
    description: 'Creamy spinach and paneer curry with two fresh rotis.',
    ingredients: ['Spinach', 'Paneer', 'Onion', 'Cream', 'Whole-wheat flour'],
    ...art.Meals,
  },
  {
    id: 'm6', name: 'Chana Pulao Bowl', category: 'Meals', unit: 'meal', price: 300, calories: 500,
    spice: 1, vegetarian: true, containsNuts: false, stock: 14, tags: ['chickpeas', 'pulao', 'rice', 'budget'],
    description: 'Fragrant chickpea pulao with cucumber salad. Our best-value meal.',
    ingredients: ['Chickpeas', 'Basmati rice', 'Whole spices', 'Cucumber'],
    ...art.Meals,
  },
  {
    id: 'm7', name: 'Grilled Chicken Tikka Salad', category: 'Meals', unit: 'meal', price: 480, calories: 410,
    spice: 2, vegetarian: false, containsNuts: false, stock: 6, tags: ['chicken', 'tikka', 'salad', 'light'],
    description: 'Charred chicken tikka over crisp greens with a lemon-yogurt dressing. The lightest meal on the menu.',
    ingredients: ['Chicken', 'Lettuce', 'Cucumber', 'Tomato', 'Yogurt', 'Lemon'],
    ...art.Meals,
  },
  {
    id: 'b1', name: 'Weekly Desi Bundle (5 lunches)', category: 'Weekly bundles', unit: 'bundle', price: 1900, calories: 600,
    spice: 2, vegetarian: false, containsNuts: false, stock: 5, tags: ['bundle', 'week', 'mixed', 'chicken'],
    description: 'Five lunches for Monday to Friday: karahi, biryani, keema wrap, daal chawal, and chana pulao. Calories are per meal.',
    ingredients: ['See the individual meals in this bundle'],
    ...art['Weekly bundles'],
  },
  {
    id: 'b2', name: 'Weekly Veggie Bundle (5 lunches)', category: 'Weekly bundles', unit: 'bundle', price: 1600, calories: 510,
    spice: 1, vegetarian: true, containsNuts: false, stock: 4, tags: ['bundle', 'week', 'vegetarian'],
    description: 'Five vegetarian lunches for Monday to Friday, rotating daal, palak paneer, and chana pulao. Calories are per meal.',
    ingredients: ['See the individual meals in this bundle'],
    ...art['Weekly bundles'],
  },
  {
    id: 'b3', name: 'Exam-Week Survival Bundle: 10 lunches and dinners with mint lemonades for late-night study sessions', category: 'Weekly bundles', unit: 'bundle', price: 3600, calories: 580,
    spice: 2, vegetarian: false, containsNuts: false, stock: 2, tags: ['bundle', 'exam', 'week', 'lemonade'],
    description: 'Ten meals (lunch and dinner for five days) plus five mint lemonades. Built for exam week. Calories are per meal.',
    ingredients: ['See the individual meals in this bundle', 'Mint lemonade'],
    ...art['Weekly bundles'],
  },
  {
    id: 's1', name: 'Chana Chaat Cup', category: 'Sides & drinks', unit: 'item', price: 180, calories: 210,
    spice: 2, vegetarian: true, containsNuts: false, stock: 20, tags: ['chaat', 'snack', 'chickpeas'],
    description: 'Tangy chickpea chaat with tamarind, onion, and fresh coriander.',
    ingredients: ['Chickpeas', 'Tamarind', 'Onion', 'Coriander'],
    image: null, // no photo yet: shows the image fallback on purpose
    imageAlt: '',
  },
  {
    id: 's2', name: 'Mint Lemonade (500 ml)', category: 'Sides & drinks', unit: 'item', price: 120, calories: 90,
    spice: 1, vegetarian: true, containsNuts: false, stock: 25, tags: ['drink', 'lemonade', 'mint', 'cold'],
    description: 'Fresh lime, mint, and a little sugar. Served cold.',
    ingredients: ['Lime', 'Mint', 'Sugar', 'Water'],
    ...art['Sides & drinks'],
  },
  {
    id: 's3', name: 'Almond Halwa Cup', category: 'Sides & drinks', unit: 'item', price: 220, calories: 350,
    spice: 1, vegetarian: true, containsNuts: true, stock: 10, tags: ['dessert', 'halwa', 'almond', 'sweet'],
    description: 'Warm semolina halwa topped with sliced almonds and pistachios.',
    ingredients: ['Semolina', 'Ghee', 'Sugar', 'Almonds', 'Pistachios'],
    ...art['Sides & drinks'],
  },
  {
    id: 's4', name: 'Walnut Date Energy Bites', category: 'Sides & drinks', unit: 'item', price: 250, calories: 300,
    spice: 1, vegetarian: true, containsNuts: true, stock: 0, tags: ['snack', 'dates', 'walnut', 'energy'],
    description: 'Date and walnut bites for study breaks. Sold out today.',
    ingredients: ['Dates', 'Walnuts', 'Oats', 'Cocoa'],
    ...art['Sides & drinks'],
  },
];

export default meals;
