function OrdersHeader() {
  return (
    <header className="orders-page-header">
      <div className="page-title-group">
        <div className="page-badge" aria-hidden="true">Sales</div>
        <div>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li>Dashboard</li>
              <li>Sales</li>
              <li aria-current="page">Orders</li>
            </ol>
          </nav>
          <h1>Order Management</h1>
          <p className="page-description">
            Monitor recent orders, review payment status, and manage fulfillment workflows.
          </p>
        </div>
      </div>

      <div className="page-actions">
        <button type="button" className="button button-secondary">
          View Archived Orders
        </button>
        <button type="button" className="button button-primary">
          Create New Order
        </button>
      </div>
    </header>
  );
}

export default OrdersHeader;
