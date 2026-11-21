# Frontend decisions

Each decision answers one problem found on a reference website. Fill in the reference-site details after
you have checked the real site (see the report template).

## Decision 1: Show charges and limits before the customer builds an order

| Field | Content |
| --- | --- |
| Problem | On the reference site (14th Street Pizza), the cart bar shows the total only as "Rs. 1,497.00 plus taxes", and delivery charges or any minimum order are not shown while browsing. Delivery charges and any minimum order only became visible after clicking the cart button, not while browsing the menu. |
| Decision | A "Before you order" banner on the home, menu, and details pages. A cart bar under the menu shows the running subtotal and how much is left to reach the minimum. The cart summary shows fee and total as soon as collection or delivery is chosen. |
| Alternative | Show the fee only on the checkout page, after the address is entered. |
| Reason | Students on a budget decide from the total price. Seeing Rs 500 minimum and Rs 150 delivery early avoids a surprise and an abandoned order. |
| Tradeoff | More text on every page, and the fee numbers live in one file (`orderRules.js`) that several components read. |
| Code location | `src/components/FeeBanner.jsx`, `src/components/CartBar.jsx`, `src/components/CartSummary.jsx`, `calculateTotals` in `src/rules/orderRules.js` |
| Evidence | `docs/screenshots/menu_desktop.png`, `docs/screenshots/cart_desktop.png`. Steps: open `/menu`, read the "Before you order" banner, add Chana Pulao Bowl and set the quantity to 2, read the cart bar, open `/cart`, choose Delivery. |

Type: **information hierarchy**.

## Decision 2: Make an empty search result explain itself and offer a next step

| Field | Content |
| --- | --- |
| Problem | On the reference site (14th Street Pizza), searching for "cheap" shows only a magnifier icon and "No result found". It does not say what was searched, suggest anything, or point to the menu categories. The search box has an X, but the page never says what to do next. |
| Decision | When nothing matches, the menu shows a heading, a sentence saying the search and filters matched nothing, three concrete suggestions (shorter word, turn off "Vegetarian only", choose "All"), and a "Clear all filters" button that restores the full menu. The "Showing X of Y items" line updates as the customer types. |
| Alternative | Show a short "No results" line like the reference site and rely on the customer to clear the box. |
| Reason | A budget-minded student who searches "cheap" and gets a dead end may give up, even though cheap meals exist. A recovery path keeps them browsing. |
| Tradeoff | More text and one more button to maintain. The empty-search state must stay different from the "Menu coming soon" state, which is used when the whole dataset is empty. |
| Code location | Empty state in `src/pages/MenuPage.jsx` (`shown.length === 0` branch and `clearFilters`). Filters are also kept in the URL there. |
| Evidence | `docs/screenshots/no_result_desktop.png`. Steps: open `/menu`, search for a word with no match (for example "cheap"), read the message, click "Clear all filters". All 14 items return. |

Type: **feedback and error recovery**.

## Decision 3: Put comparison details and stock on every listing card

| Field | Content |
| --- | --- |
| Problem | On the reference site (14th Street Pizza), menu listings do not show enough to compare options, so the only thing a customer can compare side by side is price. Other details have to be found by opening each item. |
| Decision | Each card shows price, calories, spice, diet, a nuts warning, and a stock line in words ("Only 3 left", "Sold out"). Sold-out items have a disabled button. On mobile, cards use one column with the same order of information. |
| Alternative | Show only name, picture, and price on the card and put the rest on the details page. |
| Reason | The main task is choosing between similar meals. Students filter by budget, calories, and diet, so they need those facts without opening each page. |
| Tradeoff | Cards are taller and denser, so text must be kept short (names are clamped to three lines). |
| Code location | `src/components/MealCard.jsx`, `stockInfo` in `src/utils/format.js`, card styles in `src/styles/main.css` |
| Evidence | `docs/screenshots/menu_desktop.png`, `docs/screenshots/menu_mobile.png`. Steps: open `/menu` and compare two meals; find the sold-out Walnut Date Energy Bites. |

Type: **information hierarchy and mobile layout**.