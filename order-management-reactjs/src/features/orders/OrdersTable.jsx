import OrdersTableRow from "./OrdersTableRow";

const orders = [
  {
    id: "000000124",
    date: "Jul 24, 2026",
    billTo: "Avery Parker",
    shipTo: "Avery Parker",
    payment: "Visa •••• 2145",
    total: "$2,386.00",
    status: "Processing",
    items: "3 items",
  },
  {
    id: "000000123",
    date: "Jul 22, 2026",
    billTo: "Mia Chen",
    shipTo: "Mia Chen",
    payment: "PayPal",
    total: "$1,720.50",
    status: "Complete",
    items: "2 items",
  },
  {
    id: "000000122",
    date: "Jul 20, 2026",
    billTo: "Noah Bennett",
    shipTo: "Bryant Logistics",
    payment: "Mastercard •••• 1184",
    total: "$4,110.00",
    status: "Pending",
    items: "5 items",
  },
  {
    id: "000000121",
    date: "Jul 18, 2026",
    billTo: "Sofia Grant",
    shipTo: "Sofia Grant",
    payment: "Credit Card",
    total: "$980.75",
    status: "Complete",
    items: "1 item",
  },
];

function OrdersTable() {
  return (
    <section className="orders-table-card">
      <div className="table-header">
        <div>
          <h2>Recent orders</h2>
          <p>Latest orders from the last 30 days, including payment status and shipping details.</p>
        </div>
        <div className="table-actions">
          <button type="button" className="button button-ghost">
            View All Orders
          </button>
        </div>
      </div>

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
    </section>
  );
}

export default OrdersTable;
