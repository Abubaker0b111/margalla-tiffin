import { DELIVERY_AREAS, DELIVERY_FEE, FREE_DELIVERY_FROM, MIN_ORDER } from '../rules/orderRules.js';
import { MAX_PER_MEAL } from '../rules/quantityRule.js';
import { formatRs } from '../utils/format.js';

// Charges and limits are shown up front, before the customer builds an order.
export default function FeeBanner() {
  return (
    <aside className="fee-banner" aria-labelledby="fee-title">
      <h2 id="fee-title" className="banner-title">Before you order</h2>
      <ul>
        <li>Minimum order: <strong>{formatRs(MIN_ORDER)}</strong></li>
        <li>
          Delivery to {DELIVERY_AREAS.join(', ')}: <strong>{formatRs(DELIVERY_FEE)}</strong>, free from{' '}
          {formatRs(FREE_DELIVERY_FROM)}
        </li>
        <li>Collection from our H-11 kitchen counter: <strong>free</strong></li>
        <li>Up to {MAX_PER_MEAL} of each meal per order</li>
      </ul>
    </aside>
  );
}
