import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';

export default function Header() {
  const { itemCount, menuSearch } = useStore();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          Margalla Tiffin Co.
        </Link>
        <nav aria-label="Main">
          <ul className="nav-list">
            <li>
              <NavLink to="/" end>Home</NavLink>
            </li>
            <li>
              {/* menuSearch keeps the customer's filters when they come back to the menu */}
              <NavLink to={`/menu${menuSearch}`}>Menu</NavLink>
            </li>
            <li>
              <NavLink to="/cart">
                Cart <span aria-live="polite">({itemCount})</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
