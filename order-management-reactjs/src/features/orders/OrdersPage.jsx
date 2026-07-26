import OrdersHeader from "./OrdersHeader";
import OrdersToolbar from "./OrdersToolbar";
import OrdersTable from "./OrdersTable";
import "./orders.css";

function OrdersPage() {
  return (
    <section className="orders-page">
      <OrdersHeader />

      <OrdersToolbar />

      <OrdersTable />
    </section>
  );
}

export default OrdersPage;
