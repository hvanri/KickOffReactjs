import DashboardLayout from "./layouts/DashboardLayout";
import OrdersPage from "./features/orders/OrdersPage";

function App() {
  return (
    <DashboardLayout>
      <OrdersPage />
    </DashboardLayout>
  );
}

export default App;