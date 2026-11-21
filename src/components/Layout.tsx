import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import CartDrawer from "./CartDrawer";
import NotificationPanel from "./NotificationPanel";
import ToastContainer from "./ToastContainer";

export default function Layout() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-4 sm:px-6">
        <Outlet />
      </main>
      <CartDrawer />
      <NotificationPanel />
      <ToastContainer />
    </div>
  );
}
