import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import CartBar from '../components/CartBar.jsx';
import FeeBanner from '../components/FeeBanner.jsx';
import MealCard from '../components/MealCard.jsx';
import { useStore } from '../context/StoreContext.jsx';

const CATEGORIES = ['All', 'Meals', 'Weekly bundles', 'Sides & drinks'];

const SORTERS = {
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  'cal-asc': (a, b) => a.calories - b.calories,
};

export default function MenuPage() {
  const { meals, setMenuSearch } = useStore();

  // Filter values live in state, so typing is instant. An effect copies them into the URL,
  // so Back, refresh, and shared links keep the filters (Decision 2).
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');
  const [category, setCategory] = useState(params.get('cat') || 'All');
  const [vegOnly, setVegOnly] = useState(params.get('veg') === '1');
  const [sort, setSort] = useState(params.get('sort') || 'default');

  useEffect(() => {
    const next = new URLSearchParams();
    if (query) next.set('q', query);
    if (category !== 'All') next.set('cat', category);
    if (vegOnly) next.set('veg', '1');
    if (sort !== 'default') next.set('sort', sort);
    setParams(next, { replace: true });
    // Remember the filters so the header "Menu" link can restore them.
    setMenuSearch(next.toString() ? `?${next}` : '');
    // eslint-disable-next-line react-hooks/exhaustive-deps -- setParams changes on every URL update
  }, [query, category, vegOnly, sort, setMenuSearch]);

  function clearFilters() {
    setQuery('');
    setCategory('All');
    setVegOnly(false);
    setSort('default');
  }

  // Empty dataset: nothing has loaded at all (different from "no matches").
  if (meals.length === 0) {
    return (
      <div className="container section">
        <div className="status-box">
          <h1>Menu coming soon</h1>
          <p>We have not published today's menu yet. Please check back later.</p>
          <Link className="btn btn-secondary" to="/">Back to home</Link>
        </div>
      </div>
    );
  }

  // Search and filters work together; sort runs on the filtered copy.
  const text = query.trim().toLowerCase();
  const shown = meals.filter((meal) => {
    const searchable = [meal.name, meal.description, ...meal.tags].join(' ').toLowerCase();
    return (
      (category === 'All' || meal.category === category) &&
      (!vegOnly || meal.vegetarian) &&
      searchable.includes(text)
    );
  });
  if (SORTERS[sort]) shown.sort(SORTERS[sort]);

  return (
    <div className="container section">
      <h1>Menu</h1>
      <FeeBanner />

      <form className="filters" role="search" onSubmit={(e) => e.preventDefault()}>
        <div className="field">
          <label htmlFor="q">Search meals</label>
          <input
            id="q"
            type="search"
            value={query}
            placeholder="e.g. karahi, daal, lemonade"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="cat">Category</label>
          <select id="cat" value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="sort">Sort by</label>
          <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Recommended</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="cal-asc">Calories: low to high</option>
          </select>
        </div>
        <label className="check">
          <input type="checkbox" checked={vegOnly} onChange={(e) => setVegOnly(e.target.checked)} />
          Vegetarian only
        </label>
      </form>

      <p className="result-count" role="status">
        Showing {shown.length} of {meals.length} items
      </p>

      {shown.length === 0 ? (
        <div className="empty">
          <h2>No items match your search</h2>
          <p>Nothing on the menu matches the current search and filters. Try:</p>
          <ul>
            <li>a shorter or different search word</li>
            <li>turning off "Vegetarian only"</li>
            <li>choosing the "All" category</li>
          </ul>
          <button type="button" className="btn btn-primary" onClick={clearFilters}>
            Clear all filters
          </button>
        </div>
      ) : (
        <ul className="grid">
          {shown.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </ul>
      )}

      <CartBar />
    </div>
  );
}
