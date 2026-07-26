import { useEffect, useState } from "react";
import OrdersTableRow from "./OrdersTableRow";

const apiUrl = import.meta.env.VITE_MAGENTO_API_URL;
const apiToken = import.meta.env.VITE_MAGENTO_API_TOKEN;

function normalizeOrder(item) {
  const billing = item.billing_address || {};
  const shippingAddress =
    item.extension_attributes?.shipping_assignments?.[0]?.shipping?.address || {};
  const customerName = [
    item.customer_firstname || billing.firstname,
    item.customer_lastname || billing.lastname,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();
  const shippingName = [shippingAddress.firstname, shippingAddress.lastname]
    .filter(Boolean)
    .join(" ")
    .trim();
  const currency = item.order_currency_code || item.base_currency_code || "PHP";
  const total = typeof item.grand_total === "number"
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(item.grand_total)
    : "—";
  const paymentLabel =
    item.payment?.additional_information?.[0] ||
    item.payment?.method ||
    item.payment?.method_title ||
    "—";
  const itemCount = typeof item.total_item_count === "number"
    ? item.total_item_count
    : item.total_qty_ordered;

  return {
    id: item.increment_id || item.entity_id || "—",
    date: item.created_at
      ? new Date(item.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—",
    billTo: customerName || item.customer_email || "Guest",
    shipTo: shippingName || customerName || "Guest",
    payment: paymentLabel,
    total,
    status: item.status || item.state || "Unknown",
    items:
      typeof itemCount === "number"
        ? `${itemCount} item${itemCount === 1 ? "" : "s"}`
        : "—",
  };
}

function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!apiUrl) {
      setError("Magento API URL is not configured.");
      setLoading(false);
      return;
    }
    if (!apiToken) {
      setError("Magento API token is not configured.");
      setLoading(false);
      return;
    }

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        const items = Array.isArray(data.items) ? data.items : [];
        setOrders(items.map(normalizeOrder));
        if (items.length === 0) {
          setError("No orders returned from Magento.");
        }
      })
      .catch((fetchError) => {
        setError(fetchError.message);
        setOrders([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
