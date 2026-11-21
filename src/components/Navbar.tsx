import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Bell, Store, PackageSearch } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNotifications } from "../context/NotificationsContext";

export default function Navbar() {
  const { count, openCart } = useCart();
  const { unreadCount, togglePanel } = useNotifications();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-lg font-black text-white shadow-sm">
            P
          </span>
          <div className="leading-none">
            <span className="text-lg font-extrabold tracking-tight text-slate-900">
              PIDELO
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-wider text-brand-600">
              Cochabamba
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <NavItem to="/" label="Puestos" icon={<Store className="h-4 w-4" />} />
          <NavItem
            to="/orders"
            label="Mis pedidos"
            icon={<PackageSearch className="h-4 w-4" />}
          />

          <button
            onClick={togglePanel}
            aria-label="Notificaciones"
            className="relative rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={openCart}
            aria-label="Carrito"
            className="relative flex items-center gap-2 rounded-full bg-brand-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Carrito</span>
            {count > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-brand-600">
                {count}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}

function NavItem({
  to,
  label,
  icon,
}: {
  to: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        `flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition ${
          isActive
            ? "bg-brand-50 text-brand-700"
            : "text-slate-600 hover:bg-slate-100"
        }`
      }
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </NavLink>
  );
}
