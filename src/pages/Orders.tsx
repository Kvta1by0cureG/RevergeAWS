import { Link } from "react-router-dom";
import { ChevronRight, PackageSearch } from "lucide-react";
import { useOrders } from "../context/OrdersContext";
import { formatBs, formatDate } from "../utils/format";
import { STATUS_LABELS, STATUS_EMOJI } from "../types";
import type { OrderStatus } from "../types";

const STATUS_COLORS: Record<OrderStatus, string> = {
  recibido: "bg-sky-100 text-sky-700",
  preparando: "bg-amber-100 text-amber-700",
  encamino: "bg-indigo-100 text-indigo-700",
  entregado: "bg-emerald-100 text-emerald-700",
};

export default function Orders() {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <span className="text-4xl">📦</span>
        <h1 className="text-lg font-bold text-slate-900">Aún no tienes pedidos</h1>
        <p className="text-sm text-slate-500">
          Cuando realices un pedido aparecerá aquí con su seguimiento en vivo.
        </p>
        <Link
          to="/"
          className="rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
        >
          Ver puestos
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-slate-900">
        <PackageSearch className="h-5 w-5 text-brand-600" /> Mis pedidos
      </h1>

      <ul className="space-y-3">
        {orders.map((order) => (
          <li key={order.id}>
            <Link
              to={`/orders/${order.id}`}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-brand-300 hover:shadow-sm"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 text-2xl">
                {STATUS_EMOJI[order.status]}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-400">
                    #{order.code}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      STATUS_COLORS[order.status]
                    }`}
                  >
                    {STATUS_LABELS[order.status]}
                  </span>
                </div>
                <p className="truncate text-sm font-semibold text-slate-800">
                  {order.stallName}
                </p>
                <p className="text-xs text-slate-400">
                  {formatDate(order.createdAt)} · {order.items.length} producto
                  {order.items.length === 1 ? "" : "s"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-extrabold text-brand-600">
                  {formatBs(order.total)}
                </p>
                <ChevronRight className="ml-auto h-4 w-4 text-slate-300" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
