import { useEffect, useState } from "react";
import OrdersHeader from "./OrdersHeader";
import OrdersToolbar from "./OrdersToolbar";
import OrdersTable from "./OrdersTable";
import "./orders.css";

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
    item.payment?.method_title ||
    item.payment?.method ||
    "—";
  const itemCount = typeof item.total_item_count === "number"
    ? item.total_item_count
    : item.total_qty_ordered;
  const normalizedItems = Array.isArray(item.items)
    ? item.items.map((child) => {
        const itemTotal = typeof child.row_total_incl_tax === "number"
          ? child.row_total_incl_tax
          : child.row_total;
        return {
          id: child.item_id || child.sku,
          name: child.name,
          sku: child.sku,
          quantity: child.qty_ordered,
          price: typeof child.price === "number"
            ? new Intl.NumberFormat("en-US", {
                style: "currency",
                currency,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(child.price)
            : "—",
          rowTotal: typeof itemTotal === "number"
            ? new Intl.NumberFormat("en-US", {
                style: "currency",
                currency,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(itemTotal)
            : "—",
          thumbnail: child.extension_attributes?.image_url || null,
        };
      })
    : [];

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
    itemCount: typeof itemCount === "number" ? itemCount : 0,
    items: normalizedItems,
  };
}

function getSummary(items) {
  const totalOrders = items.length;
  const pendingPayment = items.reduce((count, item) => {
    const status = (item.status || "").toLowerCase();
    const state = (item.state || "").toLowerCase();
    const isPending =
      status.includes("pending") ||
      status.includes("payment_review") ||
      state.includes("pending") ||
      state.includes("payment_review");
    return count + (isPending ? 1 : 0);
  }, 0);
  const readyToShip = items.reduce((count, item) => {
    const status = (item.status || "").toLowerCase();
    const state = (item.state || "").toLowerCase();
    const canceled = status.includes("cancel") || state.includes("cancel");
    const ready =
      ["processing", "picking", "on_picking", "on_delivery", "ready_to_ship", "shipping"].some(
        (value) => status === value || state === value,
      ) ||
      status.includes("pick") ||
      status.includes("ship") ||
      status.includes("ready");
    return count + (ready && !canceled ? 1 : 0);
  }, 0);

  return {
    totalOrders,
    pendingPayment,
    readyToShip,
  };
}

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({
    totalOrders: 0,
    pendingPayment: 0,
    readyToShip: 0,
  });
  const [selectedStatus, setSelectedStatus] = useState("all");
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
        setSummary(getSummary(items));
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

  const statusMap = {
    all: () => true,
    processing: (status) =>
      ["processing", "picking", "on_picking", "on_delivery", "shipping"].some((value) =>
        status.includes(value),
      ),
    complete: (status) => status.includes("complete") || status.includes("closed"),
    pending: (status) =>
      ["pending", "payment_review", "payment_pending", "pending_payment"].some((value) =>
        status.includes(value),
      ),
    canceled: (status) => status.includes("cancel"),
  };

  const filteredOrders = orders.filter((order) =>
    statusMap[selectedStatus]((order.status || "").toLowerCase()),
  );

  return (
    <section className="orders-page">
      <OrdersHeader />

      <OrdersToolbar
        summary={summary}
        loading={loading}
        error={error}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      <OrdersTable orders={filteredOrders} loading={loading} error={error} />
    </section>
  );
}

export default OrdersPage;
