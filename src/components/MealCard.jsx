import { Link } from 'react-router-dom';
import AddToCart from './AddToCart.jsx';
import MealImage from './MealImage.jsx';
import { SPICE_LABELS, formatRs, stockInfo } from '../utils/format.js';

// A listing card shows everything needed to compare meals without opening each one.
export default function MealCard({ meal }) {
  const stock = stockInfo(meal.stock);

  return (
    <li className="card">
      <MealImage meal={meal} className="card-image" />
      <div className="card-body">
        <h3 className="card-title">
          <Link to={`/meals/${meal.id}`}>{meal.name}</Link>
        </h3>
        <p className="price">
          {formatRs(meal.price)} <span className="unit">/ {meal.unit}</span>
        </p>
        <ul className="facts">
          <li>{meal.calories} kcal per meal</li>
          <li>Spice: {SPICE_LABELS[meal.spice]}</li>
          <li>{meal.vegetarian ? 'Vegetarian' : 'Contains meat'}</li>
          {meal.containsNuts && <li className="warn-text">Contains nuts</li>}
        </ul>
        <p className={`stock stock-${stock.level}`}>{stock.text}</p>
        <AddToCart meal={meal} />
      </div>
    </li>
  );
}
