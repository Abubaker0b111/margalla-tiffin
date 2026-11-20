import { useStore } from '../context/StoreContext.jsx';

export default function Footer() {
  const { demo, updateDemo, simulateFailure, reload } = useStore();

  return (
    <footer className="site-footer">
      <div className="container">
        <p>
          Margalla Tiffin Co. is a fictional business made for a university assignment. Orders are
          simulated: nothing is cooked, sent, or charged.
        </p>

        <details className="demo-panel">
          <summary>Demo controls (for testing edge cases)</summary>
          <div className="demo-body">
            <label className="check">
              <input
                type="checkbox"
                checked={demo.emptyMenu}
                onChange={(e) => updateDemo({ emptyMenu: e.target.checked })}
              />
              Simulate an empty menu
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={demo.stockDrop}
                onChange={(e) => updateDemo({ stockDrop: e.target.checked })}
              />
              Simulate a stock drop (every item has 1 left, Chicken Biryani Box is sold out)
            </label>
            <div className="demo-buttons">
              <button type="button" className="btn btn-secondary" onClick={simulateFailure}>
                Simulate a loading failure
              </button>
              <button type="button" className="btn btn-secondary" onClick={reload}>
                Reload menu data
              </button>
            </div>
          </div>
        </details>
      </div>
    </footer>
  );
}
