function OrdersTableRow({ order }) {
  const statusClass = order.status.toLowerCase().replace(/\s+/g, "-");

  return (
    <tr>
      <td>
        <div className="order-id-cell">
          <strong>{order.id}</strong>
          <span className="order-meta">{order.items}</span>
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
        <button type="button" className="button button-ghost">
          View
        </button>
      </td>
    </tr>
  );
}

export default OrdersTableRow;
