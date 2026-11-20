import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="container section">
      <div className="status-box">
        <h1>Page not found</h1>
        <p>This page does not exist. Check the address, or go back to a page that does.</p>
        <Link className="btn btn-primary" to="/menu">Browse the menu</Link>{' '}
        <Link className="btn btn-secondary" to="/">Go home</Link>
      </div>
    </div>
  );
}
