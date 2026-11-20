import { useStore } from '../context/StoreContext.jsx';
import { DELIVERY_AREAS, DELIVERY_FEE, FREE_DELIVERY_FROM, MIN_ORDER } from '../rules/orderRules.js';
import { formatRs } from '../utils/format.js';

// Fulfilment choice plus calculated totals. "children" holds the page's main action button.
export default function CartSummary({ children }) {
  const { prefs, updatePrefs, totals, itemCount } = useStore();
  const delivering = prefs.fulfilment === 'delivery';

  let deliveryText = 'Free (collection)';
  if (delivering) deliveryText = totals.deliveryFee === 0 ? 'Free' : formatRs(totals.deliveryFee);

  return (
    <section className="summary" aria-labelledby="summary-title">
      <h2 id="summary-title">Order summary</h2>

      <fieldset className="fulfilment">
        <legend>How will you get your order?</legend>
        <label className="check">
          <input
            type="radio"
            name="fulfilment"
            value="collect"
            checked={!delivering}
            onChange={() => updatePrefs({ fulfilment: 'collect' })}
          />
          Collect from H-11 kitchen counter (free)
        </label>
        <label className="check">
          <input
            type="radio"
            name="fulfilment"
            value="delivery"
            checked={delivering}
            onChange={() => updatePrefs({ fulfilment: 'delivery' })}
          />
          Delivery ({formatRs(DELIVERY_FEE)}, free from {formatRs(FREE_DELIVERY_FROM)})
        </label>
        {delivering && (
          <div className="field">
            <label htmlFor="area">Delivery area</label>
            <select id="area" value={prefs.area} onChange={(e) => updatePrefs({ area: e.target.value })}>
              {DELIVERY_AREAS.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>
        )}
      </fieldset>

      <dl className="totals">
        <div><dt>Items</dt><dd>{itemCount}</dd></div>
        <div><dt>Subtotal</dt><dd>{formatRs(totals.subtotal)}</dd></div>
        <div><dt>Delivery</dt><dd>{deliveryText}</dd></div>
        <div className="grand"><dt>Total</dt><dd>{formatRs(totals.total)}</dd></div>
      </dl>

      {totals.subtotal > 0 && !totals.meetsMinimum && (
        <p className="notice warn">
          <strong>Minimum order:</strong> add {formatRs(totals.shortBy)} more to reach {formatRs(MIN_ORDER)}.
        </p>
      )}
      {delivering && totals.subtotal > 0 && totals.deliveryFee > 0 && (
        <p className="notice info">
          Add {formatRs(totals.freeDeliveryLeft)} more for free delivery.
        </p>
      )}

      {children}
    </section>
  );
}
