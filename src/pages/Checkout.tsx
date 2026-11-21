import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { MapPin, LocateFixed, CreditCard, QrCode, Banknote, ArrowLeft } from "lucide-react";
import L from "leaflet";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";
import { useNotifications } from "../context/NotificationsContext";
import { useToast } from "../context/ToastContext";
import { COCHABAMBA_CENTER } from "../data/seed";
import { formatBs } from "../utils/format";
import type { OrderItem, PaymentMethod } from "../types";

function ClickHandler({ onClick }: { onClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function Recenter({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position, map]);
  return null;
}

const DEFAULT_POS: [number, number] = COCHABAMBA_CENTER;

export default function Checkout() {
  const { items, stall, breakdown, clear, couponCode } = useCart();
  const { createOrder } = useOrders();
  const { addNotification, fireNativeNotif } = useNotifications();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("Efectivo");
  const [pos, setPos] = useState<[number, number]>(DEFAULT_POS);
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const errors = useMemo(() => {
    const e: { name?: string; phone?: string; address?: string } = {};
    if (!name.trim()) e.name = "El nombre es obligatorio.";
    if (!/^[67]\d{7}$/.test(phone.trim()))
      e.phone = "Ingresa un celular válido de 8 dígitos que empiece con 6 o 7.";
    if (!address.trim()) e.address = "La dirección es obligatoria.";
    return e;
  }, [name, phone, address]);

  const isValid = Object.keys(errors).length === 0;

  if (items.length === 0 && !submitting) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <span className="text-4xl">🛒</span>
        <p className="text-sm text-slate-500">Tu carrito está vacío.</p>
        <button
          onClick={() => navigate("/")}
          className="font-semibold text-brand-600 hover:underline"
        >
          Ver puestos
        </button>
      </div>
    );
  }

  const handlePhoneChange = (v: string) => {
    setPhone(v.replace(/\D/g, "").slice(0, 8));
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (p) => setPos([p.coords.latitude, p.coords.longitude]),
      () => alert("No pudimos obtener tu ubicación. Mueve el pin manualmente."),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  const handleConfirm = () => {
    setTouched(true);
    if (!isValid) return;
    setSubmitting(true);

    const orderItems: OrderItem[] = items.map((i) => ({
      dishId: i.dishId,
      name: i.name,
      price: i.price,
      quantity: i.quantity,
    }));

    const order = createOrder({
      stallId: stall?.id ?? "",
      stallName: stall?.name ?? "Puesto",
      items: orderItems,
      subtotal: breakdown.subtotal,
      promoDiscount: breakdown.promoDiscount,
      coupon: breakdown.couponApplied ?? undefined,
      shipping: breakdown.shipping,
      total: breakdown.total,
      customerName: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      notes: notes.trim(),
      payment,
      lat: pos[0],
      lng: pos[1],
    });

    // Fire the initial "recibido" notification now.
    const title = "Pedido recibido";
    const message = `${order.stallName} recibió tu pedido y lo está preparando.`;
    addNotification({ title, message, orderId: order.id });
    showToast(title, message);
    fireNativeNotif(title, message);

    clear();
    navigate(`/orders/${order.id}`);
  };

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-brand-600"
      >
        <ArrowLeft className="h-4 w-4" /> Volver
      </button>

      <h1 className="mb-4 text-xl font-extrabold text-slate-900">Confirmar pedido</h1>

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        {/* Left: form + map */}
        <div className="space-y-4">
          {/* Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
              Datos de entrega
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Nombre" error={touched ? errors.name : undefined} required>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre completo"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400"
                />
              </Field>
              <Field
                label="Teléfono (celular)"
                error={touched ? errors.phone : undefined}
                required
              >
                <input
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  inputMode="numeric"
                  placeholder="7XXXXXXXX"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400"
                />
              </Field>
            </div>
            <div className="mt-3">
              <Field label="Dirección" error={touched ? errors.address : undefined} required>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Calle, número, zona, referencia"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400"
                />
              </Field>
            </div>
            <div className="mt-3">
              <Field label="Notas (opcional)">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ej. tocar timbre 2, dejar con el portero…"
                  rows={2}
                  className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400"
                />
              </Field>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                Ubicación de entrega
              </h2>
              <button
                onClick={useMyLocation}
                className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-900"
              >
                <LocateFixed className="h-3.5 w-3.5" /> Usar mi ubicación
              </button>
            </div>
            <p className="mb-2 text-xs text-slate-400">
              Toca el mapa para mover el pin de entrega.
            </p>
            <div className="h-64 overflow-hidden rounded-xl border border-slate-200">
              <MapContainer
                center={pos}
                zoom={14}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={pos} icon={pinIcon} />
                <ClickHandler
                  onClick={(lat, lng) => setPos([lat, lng])}
                />
                <Recenter position={pos} />
              </MapContainer>
            </div>
            <p className="mt-2 flex items-center gap-1 text-xs text-slate-400">
              <MapPin className="h-3.5 w-3.5" /> {pos[0].toFixed(5)}, {pos[1].toFixed(5)}
            </p>
          </div>

          {/* Payment */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
              Método de pago
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { m: "Efectivo", icon: <Banknote className="h-5 w-5" /> },
                  { m: "QR", icon: <QrCode className="h-5 w-5" /> },
                  { m: "Tarjeta", icon: <CreditCard className="h-5 w-5" /> },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.m}
                  onClick={() => setPayment(opt.m)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-sm font-medium transition ${
                    payment === opt.m
                      ? "border-brand-500 bg-brand-50 text-brand-700"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {opt.icon}
                  {opt.m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: summary */}
        <div className="lg:sticky lg:top-20 h-fit">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
              Resumen del pedido
            </h2>
            <p className="mb-2 text-sm font-semibold text-slate-800">
              {stall?.name}
            </p>
            <ul className="mb-3 space-y-1.5">
              {items.map((i) => (
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
            <div className="space-y-0.5 border-t border-slate-100 pt-2 text-sm">
              <SummaryRow label="Subtotal" value={formatBs(breakdown.subtotal)} />
              {breakdown.promoDiscount > 0 && (
                <SummaryRow
                  label="Promo del puesto"
                  value={`- ${formatBs(breakdown.promoDiscount)}`}
                  accent="text-emerald-600"
                />
              )}
              {breakdown.couponDiscount > 0 && (
                <SummaryRow
                  label={`Cupón ${couponCode ?? ""}`}
                  value={`- ${formatBs(breakdown.couponDiscount)}`}
                  accent="text-emerald-600"
                />
              )}
              {breakdown.couponApplied?.type === "free_shipping" && (
                <SummaryRow
                  label="Cupón envío gratis"
                  value={`- ${formatBs(breakdown.couponApplied.amount)}`}
                  accent="text-emerald-600"
                />
              )}
              <SummaryRow
                label="Envío"
                value={breakdown.shipping === 0 ? "Gratis" : formatBs(breakdown.shipping)}
                accent={breakdown.shipping === 0 ? "text-emerald-600" : undefined}
              />
              <div className="mt-1 flex items-center justify-between border-t border-slate-100 pt-2">
                <span className="font-bold text-slate-900">Total</span>
                <span className="text-lg font-extrabold text-brand-600">
                  {formatBs(breakdown.total)}
                </span>
              </div>
            </div>

            {touched && !isValid && (
              <p className="mt-3 text-xs font-medium text-rose-500">
                Completa correctamente los datos para continuar.
              </p>
            )}

            <button
              onClick={handleConfirm}
              className="mt-3 w-full rounded-xl bg-brand-500 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-brand-600"
            >
              Confirmar pedido — {formatBs(breakdown.total)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const pinIcon = L.divIcon({
  className: "",
  html: `<div style="font-size:28px;line-height:1;transform:translateY(-2px)">📍</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

function Field({
  label,
  children,
  error,
  required,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-slate-600">
        {label} {required && <span className="text-rose-500">*</span>}
      </span>
      {children}
      {error && <span className="mt-0.5 block text-xs text-rose-500">{error}</span>}
    </label>
  );
}

function SummaryRow({
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
