import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, CreditCard } from "lucide-react";
import { useOrders } from "../context/OrdersContext";
import { formatBs, formatDate } from "../utils/format";
import {
  STATUS_LABELS,
  STATUS_EMOJI,
} from "../types";
import type { OrderStatus } from "../types";

const STEPS: OrderStatus[] = ["recibido", "preparando", "encamino", "entregado"];

export default function OrderDetail() {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrder } = useOrders();
  const order = orderId ? getOrder(orderId) : undefined;

  if (!order) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <span className="text-4xl">🔍</span>
        <p className="text-sm text-slate-500">Pedido no encontrado.</p>
        <Link to="/orders" className="font-semibold text-brand-600 hover:underline">
          Ver mis pedidos
        </Link>
      </div>
    );
  }

  const currentIdx = STEPS.indexOf(order.status);

  return (
    <div>
      <Link
        to="/orders"
        className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-brand-600"
      >
        <ArrowLeft className="h-4 w-4" /> Volver a mis pedidos
      </Link>

      {/* Header */}
      <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="font-mono text-sm font-bold text-slate-400">
              #{order.code}
            </p>
            <h1 className="text-xl font-extrabold text-slate-900">
              {order.stallName}
            </h1>
            <p className="text-xs text-slate-400">{formatDate(order.createdAt)}</p>
          </div>
          <span
            className="rounded-full bg-brand-100 px-3 py-1 text-sm font-semibold text-brand-700"
          >
            {STATUS_EMOJI[order.status]} {STATUS_LABELS[order.status]}
          </span>
        </div>
      </div>

      {/* Stepper */}
      <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-500">
          Seguimiento del pedido
        </h2>
        <Stepper steps={STEPS} currentIndex={currentIdx} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        {/* Items */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
            Detalle del pedido
          </h2>
          <ul className="space-y-2">
            {order.items.map((i) => (
              <li key={i.dishId} className="flex justify-between gap-2 text-sm">
                <span className="text-slate-600">
                  {i.quantity} × {i.name}
                </span>
                <span className="font-medium text-slate-700">
                  {formatBs(i.price * i.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-3 space-y-0.5 border-t border-slate-100 pt-3 text-sm">
            <Row label="Subtotal" value={formatBs(order.subtotal)} />
            {order.promoDiscount > 0 && (
              <Row
                label="Promo del puesto"
                value={`- ${formatBs(order.promoDiscount)}`}
                accent="text-emerald-600"
              />
            )}
            {order.coupon && order.coupon.amount > 0 && (
              <Row
                label={`Cupón ${order.coupon.code}`}
                value={`- ${formatBs(order.coupon.amount)}`}
                accent="text-emerald-600"
              />
            )}
            <Row
              label="Envío"
              value={order.shipping === 0 ? "Gratis" : formatBs(order.shipping)}
              accent={order.shipping === 0 ? "text-emerald-600" : undefined}
            />
            <div className="mt-1 flex items-center justify-between border-t border-slate-100 pt-2">
              <span className="font-bold text-slate-900">Total</span>
              <span className="text-lg font-extrabold text-brand-600">
                {formatBs(order.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Delivery info */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
              Entrega
            </h2>
            <dl className="space-y-2 text-sm">
              <Info label="Cliente" value={order.customerName} />
              <Info label="Teléfono" value={order.phone} />
              <Info label="Dirección" value={order.address} />
              {order.notes && <Info label="Notas" value={order.notes} />}
              <Info
                label="Coordenadas"
                value={`${order.lat.toFixed(5)}, ${order.lng.toFixed(5)}`}
                icon={<MapPin className="h-3.5 w-3.5" />}
              />
              <Info
                label="Pago"
                value={order.payment}
                icon={<CreditCard className="h-3.5 w-3.5" />}
              />
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stepper({
  steps,
  currentIndex,
}: {
  steps: OrderStatus[];
  currentIndex: number;
}) {
  return (
    <div className="flex flex-col gap-0 sm:flex-row sm:items-start">
      {steps.map((step, idx) => {
        const done = idx < currentIndex;
        const active = idx === currentIndex;
        const last = idx === steps.length - 1;
        return (
          <div
            key={step}
            className="flex flex-1 flex-row items-start gap-3 sm:flex-col sm:items-center sm:gap-2"
          >
            {/* circle */}
            <div className="relative flex flex-row items-center gap-3 sm:flex-col sm:items-center">
              <div
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition ${
                  done
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : active
                      ? "border-brand-500 bg-brand-500 text-white shadow-lg ring-4 ring-brand-100"
                      : "border-slate-200 bg-white text-slate-400"
                }`}
              >
                {done ? "✓" : idx + 1}
              </div>
              {/* connector for horizontal (desktop) */}
              {!last && (
                <div
                  className={`hidden h-0.5 flex-1 sm:block sm:h-0.5 sm:w-full ${
                    done ? "bg-emerald-500" : "bg-slate-200"
                  }`}
                  style={{ order: 2 }}
                />
              )}
            </div>
            <div className="min-w-0 flex-1 pb-4 sm:pb-0 sm:text-center">
              <p className="text-2xl sm:text-base">{STATUS_EMOJI[step]}</p>
              <p
                className={`text-sm font-semibold ${
                  active ? "text-brand-600" : done ? "text-slate-700" : "text-slate-400"
                }`}
              >
                {STATUS_LABELS[step]}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="flex items-center justify-between py-0.5">
      <span className="text-slate-500">{label}</span>
      <span className={`font-medium ${accent ?? "text-slate-700"}`}>{value}</span>
    </div>
  );
}

function Info({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="flex-shrink-0 text-xs font-medium text-slate-400">{label}</dt>
      <dd className="flex items-center gap-1 text-right text-sm font-medium text-slate-700">
        {icon}
        {value}
      </dd>
    </div>
  );
}
