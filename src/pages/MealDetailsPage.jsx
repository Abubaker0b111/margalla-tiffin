import { Link, useParams } from 'react-router-dom';
import AddToCart from '../components/AddToCart.jsx';
import FeeBanner from '../components/FeeBanner.jsx';
import MealImage from '../components/MealImage.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { SPICE_LABELS, formatRs, stockInfo } from '../utils/format.js';

export default function MealDetailsPage() {
  const { id } = useParams();
  const { meals, menuSearch } = useStore();
  const meal = meals.find((m) => m.id === id);

  // Invalid ID: explain and give a way forward (FR02)
  if (!meal) {
    return (
      <div className="container section">
        <div className="status-box">
          <h1>Meal not found</h1>
          <p>We could not find a meal with the ID "{id}". The link may be wrong, or the meal may have been removed.</p>
          <Link className="btn btn-primary" to={`/menu${menuSearch}`}>Back to the menu</Link>
        </div>
      </div>
    );
  }

  const stock = stockInfo(meal.stock);

  return (
    <div className="container section">
      <p><Link to={`/menu${menuSearch}`}>&larr; Back to the menu</Link></p>

      <div className="detail-layout">
        <MealImage key={meal.id} meal={meal} className="detail-image" />

        <div>
          <h1>{meal.name}</h1>
          <p className="price price-large">
            {formatRs(meal.price)} <span className="unit">/ {meal.unit}</span>
          </p>
          <p>{meal.description}</p>
          <p className={`stock stock-${stock.level}`}>{stock.text}</p>
          <AddToCart meal={meal} />
        </div>
      </div>

      <h2>Details</h2>
      <table className="facts-table">
        <tbody>
          <tr><th scope="row">Calories</th><td>{meal.calories} kcal per meal</td></tr>
          <tr><th scope="row">Spice level</th><td>{SPICE_LABELS[meal.spice]}</td></tr>
          <tr><th scope="row">Diet</th><td>{meal.vegetarian ? 'Vegetarian' : 'Contains meat'}</td></tr>
          <tr><th scope="row">Nuts</th><td>{meal.containsNuts ? 'Contains nuts. Not available on nut-free orders.' : 'No nuts'}</td></tr>
          <tr><th scope="row">Ingredients</th><td>{meal.ingredients.join(', ')}</td></tr>
        </tbody>
      </table>

      <FeeBanner />
    </div>
  );
}
