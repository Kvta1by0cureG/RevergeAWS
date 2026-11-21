import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { OrdersProvider } from "./context/OrdersContext";
import { NotificationsProvider } from "./context/NotificationsContext";
import { ToastProvider } from "./context/ToastContext";
import { useOrderProgression } from "./hooks/useOrderProgression";
import Layout from "./components/Layout";
import Catalog from "./pages/Catalog";
import StallDetail from "./pages/StallDetail";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";

function AppShell() {
  useOrderProgression();
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Catalog />} />
        <Route path="/r/:slug" element={<StallDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderId" element={<OrderDetail />} />
        <Route path="*" element={<Catalog />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <NotificationsProvider>
        <OrdersProvider>
          <CartProvider>
            <AppShell />
          </CartProvider>
        </OrdersProvider>
      </NotificationsProvider>
    </ToastProvider>
  );
}
