# Frontend decisions

Each decision answers one problem found on a reference website. Fill in the reference-site details after
you have checked the real site (see the report template).

## Decision 1: Show charges and limits before the customer builds an order

| Field | Content |
| --- | --- |
| Problem | Delivery fees and minimum order values appear late, at checkout. [CONFIRM ON YOUR REFERENCE SITE] |
| Decision | A "Before you order" banner on the home, menu, and details pages. A cart bar under the menu shows the running subtotal and how much is left to reach the minimum. The cart summary shows fee and total as soon as collection or delivery is chosen. |
| Alternative | Show the fee only on the checkout page, after the address is entered. |
| Reason | Students on a budget decide from the total price. Seeing Rs 500 minimum and Rs 150 delivery early avoids a surprise and an abandoned order. |
| Tradeoff | More text on every page, and the fee numbers live in one file (`orderRules.js`) that several components read. |
| Code location | `src/components/FeeBanner.jsx`, `src/components/CartBar.jsx`, `src/components/CartSummary.jsx`, `calculateTotals` in `src/rules/orderRules.js` |
| Evidence | `docs/screenshots/02-menu-desktop.png`, `06-cart-delivery-desktop.png`. Steps: open `/menu`, add one Chana Chaat Cup, read the cart bar, open `/cart`, choose Delivery. |

Type: **information hierarchy**.

## Decision 2: Keep search and filters when the customer leaves and returns

| Field | Content |
| --- | --- |
| Problem | Opening a product and going back resets the search and filters. [CONFIRM ON YOUR REFERENCE SITE] |
| Decision | Search, category, vegetarian, and sort values are copied into the URL query string. The header "Menu" link and the "Back to the menu" link on the details page use the saved query. |
| Alternative | Keep the filters only in React state, which is lost when the menu page unmounts, or save them in local storage. |
| Reason | Customers compare several meals. Keeping their place saves repeated typing. URL state also makes Back, refresh, and shared links work. |
| Tradeoff | Two copies of the filters (state and URL) must stay in sync, and the URL gets longer. |
| Code location | `src/pages/MenuPage.jsx` (`useSearchParams` and the effect), `menuSearch` in `src/context/StoreContext.jsx`, `src/components/Header.jsx` |
| Evidence | Steps: on `/menu` search "daal", open the meal, click "Menu" in the header. The search box still says "daal". |

Type: **interaction / state behaviour**.

## Decision 3: Put comparison details and stock on every listing card

| Field | Content |
| --- | --- |
| Problem | Listings leave out information needed to compare options, and sold-out items are only discovered late. [CONFIRM ON YOUR REFERENCE SITE] |
| Decision | Each card shows price, calories, spice, diet, a nuts warning, and a stock line in words ("Only 3 left", "Sold out"). Sold-out items have a disabled button. On mobile, cards use one column with the same order of information. |
| Alternative | Show only name, picture, and price on the card and put the rest on the details page. |
| Reason | The main task is choosing between similar meals. Students filter by budget, calories, and diet, so they need those facts without opening each page. |
| Tradeoff | Cards are taller and denser, so text must be kept short (names are clamped to three lines). |
| Code location | `src/components/MealCard.jsx`, `stockInfo` in `src/utils/format.js`, card styles in `src/styles/main.css` |
| Evidence | `docs/screenshots/02-menu-desktop.png`, `14-menu-mobile.png`. Steps: open `/menu` and compare two meals; find the sold-out Walnut Date Energy Bites. |

Type: **information hierarchy and mobile layout**.
