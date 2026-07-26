import { useState } from "react";

function OrdersTableRow({ order }) {
  const [isOpen, setIsOpen] = useState(false);
  const statusClass = order.status.toLowerCase().replace(/\s+/g, "-");

  return (
    <>
      <tr>
        <td>
          <div className="order-id-cell">
            <strong>{order.id}</strong>
            <span className="order-meta">{order.itemCount} item{order.itemCount === 1 ? "" : "s"}</span>
          </div>
        </td>
        <td>{order.date}</td>
        <td>{order.billTo}</td>
        <td>{order.shipTo}</td>
        <td>{order.payment}</td>
        <td>{order.total}</td>
        <td>
          <span className={`status-badge status-${statusClass}`}>
            {order.status}
          </span>
        </td>
        <td>
          <button type="button" className="button button-ghost" onClick={() => setIsOpen(true)}>
            View
          </button>
        </td>
      </tr>

      {isOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby={`order-details-${order.id}`}>
          <div className="modal-panel">
            <div className="modal-header">
              <div>
                <p className="toolbar-label">Order details</p>
                <h3 id={`order-details-${order.id}`}>Order {order.id}</h3>
                <p className="modal-subtitle">{order.date} · {order.status}</p>
              </div>
              <button type="button" className="button button-tertiary" onClick={() => setIsOpen(false)}>
                Close
              </button>
            </div>

            <div className="modal-content">
              <table className="modal-table">
                <caption className="sr-only">Order item details</caption>
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Row total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="item-card">
                          <div className="item-thumbnail">
                            {item.thumbnail ? (
                              <img src={item.thumbnail} alt={item.name} />
                            ) : (
                              <div className="item-thumbnail-fallback">{item.name.charAt(0)}</div>
                            )}
                          </div>
                          <div>
                            <strong>{item.name}</strong>
                            <p className="order-meta">SKU: {item.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td>{item.rowTotal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrdersTableRow;
