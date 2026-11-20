import { Outlet } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';

// Wraps every page that needs menu data: shows loading and error states (FR14).
export default function DataGate() {
  const { status, errorMessage, reload } = useStore();

  if (status === 'loading') {
    return (
      <div className="container section">
        <p className="status-box" role="status">Loading the menu...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="container section">
        <div className="status-box error" role="alert">
          <h1>The menu did not load</h1>
          <p>{errorMessage}</p>
          <button type="button" className="btn btn-primary" onClick={reload}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
