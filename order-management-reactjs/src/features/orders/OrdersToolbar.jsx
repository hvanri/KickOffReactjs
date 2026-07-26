function OrdersToolbar() {
  return (
    <section className="orders-toolbar" aria-label="Order management filters">
      <div className="toolbar-summary">
        <div>
          <p className="toolbar-label">Total orders</p>
          <strong>1,284</strong>
        </div>
        <div>
          <p className="toolbar-label">Pending payment</p>
          <strong>42</strong>
        </div>
        <div>
          <p className="toolbar-label">Ready to ship</p>
          <strong>86</strong>
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
            />
            <button type="button" className="button button-tertiary">
              Search
            </button>
          </div>
        </div>

        <div className="toolbar-field">
          <label htmlFor="order-status">Order status</label>
          <select id="order-status" defaultValue="all">
            <option value="all">All statuses</option>
            <option value="processing">Processing</option>
            <option value="complete">Complete</option>
            <option value="pending">Pending</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        <div className="toolbar-field">
          <label htmlFor="order-date">Date range</label>
          <select id="order-date" defaultValue="30">
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </div>
      </form>

      <div className="toolbar-actions">
        <button type="button" className="button button-secondary">
          Export Orders
        </button>
        <button type="button" className="button button-secondary">
          Print Invoices
        </button>
        <button type="button" className="button button-secondary">
          Update Status
        </button>
      </div>
    </section>
  );
}

export default OrdersToolbar;
