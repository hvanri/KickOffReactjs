import OrdersTableRow from "./OrdersTableRow";

function OrdersTable({ orders, loading, error }) {
  return (
    <section className="orders-table-card">
      <div className="table-header">
        <div>
          <h2>Recent orders</h2>
          <p>Latest orders from Magento 2, including payment status and shipping details.</p>
        </div>
        <div className="table-actions">
          <button type="button" className="button button-ghost">
            View All Orders
          </button>
        </div>
      </div>

      {loading ? (
        <div className="table-message">Loading orders…</div>
      ) : error ? (
        <div className="table-message table-message-error">{error}</div>
      ) : orders.length === 0 ? (
        <div className="table-message">No orders available.</div>
      ) : (
        <div className="table-scroll">
          <table className="orders-table">
            <caption>Order list with status and total amount</caption>
            <thead>
              <tr>
                <th scope="col">Order #</th>
                <th scope="col">Purchase Date</th>
                <th scope="col">Bill To</th>
                <th scope="col">Ship To</th>
                <th scope="col">Payment</th>
                <th scope="col">Grand Total</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <OrdersTableRow key={order.id} order={order} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default OrdersTable;
