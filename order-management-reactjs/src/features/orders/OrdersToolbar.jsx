function OrdersToolbar({ summary, loading, error, selectedStatus, onStatusChange }) {
  const { totalOrders, pendingPayment, readyToShip } = summary || {
    totalOrders: 0,
    pendingPayment: 0,
    readyToShip: 0,
  };

  return (
    <section className="orders-toolbar" aria-label="Order management filters">
      <div className="toolbar-summary">
        <div>
          <p className="toolbar-label">Total orders</p>
          <strong>{loading ? "..." : totalOrders.toLocaleString()}</strong>
        </div>
        <div>
          <p className="toolbar-label">Pending payment</p>
          <strong>{loading ? "..." : pendingPayment.toLocaleString()}</strong>
        </div>
        <div>
          <p className="toolbar-label">Ready to ship</p>
          <strong>{loading ? "..." : readyToShip.toLocaleString()}</strong>
        </div>
      </div>

      <form className="toolbar-row">
        <div className="toolbar-field">
          <label htmlFor="order-search">Search orders</label>
          <div className="toolbar-field-inline">
            <input
              id="order-search"
              type="search"
              placeholder="Search order #, customer, email"
              aria-label="Search orders"
              disabled={!summary || loading || error}
            />
            <button type="button" className="button button-tertiary" disabled={!summary || loading || error}>
              Search
            </button>
          </div>
        </div>

        <div className="toolbar-field">
          <label htmlFor="order-status">Order status</label>
          <select
            id="order-status"
            value={selectedStatus}
            onChange={(event) => onStatusChange(event.target.value)}
            disabled={loading || Boolean(error)}
          >
            <option value="all">All statuses</option>
            <option value="processing">Processing</option>
            <option value="complete">Complete</option>
            <option value="pending">Pending</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        <div className="toolbar-field">
          <label htmlFor="order-date">Date range</label>
          <select id="order-date" defaultValue="30" disabled={loading || Boolean(error)}>
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </div>
      </form>

      <div className="toolbar-actions">
        <button type="button" className="button button-secondary" disabled={loading || Boolean(error)}>
          Export Orders
        </button>
        <button type="button" className="button button-secondary" disabled={loading || Boolean(error)}>
          Print Invoices
        </button>
        <button type="button" className="button button-secondary" disabled={loading || Boolean(error)}>
          Update Status
        </button>
      </div>
    </section>
  );
}

export default OrdersToolbar;
