import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { formatRs } from '../utils/format.js';

export default function ConfirmationPage() {
  const { lastOrder, menuSearch } = useStore();

  if (!lastOrder) {
    return (
      <div className="container section">
        <div className="status-box">
          <h1>No recent order</h1>
          <p>There is no order to show yet.</p>
          <Link className="btn btn-primary" to={`/menu${menuSearch}`}>Browse the menu</Link>
        </div>
      </div>
    );
  }

  const delivering = lastOrder.fulfilment === 'delivery';

  return (
    <div className="container section">
      <div className="notice success">
        <h1>Order confirmed (simulated)</h1>
        <p>Thank you! Your order number is <strong>{lastOrder.id}</strong>. Nothing was cooked, sent, or charged.</p>
      </div>

      <h2>What you ordered</h2>
      <table className="order-table">
        <thead>
          <tr><th scope="col">Item</th><th scope="col">Qty</th><th scope="col">Price</th></tr>
        </thead>
        <tbody>
          {lastOrder.items.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{formatRs(item.price * item.quantity)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <dl className="totals">
        <div><dt>Subtotal</dt><dd>{formatRs(lastOrder.subtotal)}</dd></div>
        <div><dt>Delivery</dt><dd>{lastOrder.deliveryFee === 0 ? 'Free' : formatRs(lastOrder.deliveryFee)}</dd></div>
        <div className="grand"><dt>Total</dt><dd>{formatRs(lastOrder.total)}</dd></div>
      </dl>

      <p>
        <strong>Fulfilment:</strong>{' '}
        {delivering ? `Delivery to ${lastOrder.area}` : 'Collect from our H-11 kitchen counter'}
        {lastOrder.nutFree && ' (nut-free order)'}
      </p>

      <Link className="btn btn-primary" to="/menu">Start a new order</Link>
    </div>
  );
}
