import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, X, ShoppingBag, Tag, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { formatBs } from "../utils/format";
import { COUPONS } from "../data/seed";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    increment,
    decrement,
    removeItem,
    breakdown,
    couponCode,
    couponMessage,
    applyCoupon,
    removeCoupon,
    stall,
  } = useCart();
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState("");

  if (!isOpen) return null;

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={closeCart}
        aria-hidden
      />
      <aside className="fixed right-0 top-0 z-50 flex h-full w-[min(420px,100vw)] animate-slide-in-right flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-brand-600" />
            <h2 className="text-lg font-bold text-slate-900">Tu carrito</h2>
          </div>
          <button
            onClick={closeCart}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100"
            aria-label="Cerrar carrito"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <span className="text-5xl">🛒</span>
            <p className="text-sm text-slate-500">
              Tu carrito está vacío. ¡Agrega algo delicioso!
            </p>
          </div>
        ) : (
          <>
            {/* Stall badge */}
            {stall && (
              <div className="bg-slate-50 px-4 py-2 text-xs font-medium text-slate-500">
                Pedido de <span className="font-semibold text-slate-700">{stall.name}</span>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-4 py-3">
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li
                    key={item.dishId}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 p-2.5"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-400">{item.section}</p>
                      <p className="text-sm font-medium text-brand-600">
                        {formatBs(item.price)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decrement(item.dishId)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100"
                        aria-label="Quitar uno"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increment(item.dishId)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100"
                        aria-label="Agregar uno"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => removeItem(item.dishId)}
                        className="ml-1 flex h-7 w-7 items-center justify-center rounded-full text-rose-400 transition hover:bg-rose-50"
                        aria-label="Quitar producto"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coupon */}
            <div className="border-t border-slate-100 p-4">
              {couponCode ? (
                <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2">
                  <div className="flex items-center gap-2 text-sm text-emerald-700">
                    <Tag className="h-4 w-4" />
                    <span className="font-semibold">{couponCode}</span> aplicado
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-medium text-rose-500 hover:underline"
                  >
                    Quitar
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Cupón de descuento"
                    className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400"
                  />
                  <button
                    onClick={() => {
                      if (couponInput.trim()) applyCoupon(couponInput.trim());
                    }}
                    className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900"
                  >
                    Aplicar
                  </button>
                </div>
              )}
              {couponMessage && (
                <p
                  className={`mt-1.5 text-xs font-medium ${
                    couponMessage.type === "success"
                      ? "text-emerald-600"
                      : "text-rose-500"
                  }`}
                >
                  {couponMessage.text}
                </p>
              )}
              <p className="mt-1 text-[11px] text-slate-400">
                Cupones de prueba: {COUPONS.map((c) => c.code).join(", ")}
              </p>
            </div>

            {/* Summary */}
            <div className="border-t border-slate-100 p-4">
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
                  label="Cupón"
                  value={`- ${formatBs(breakdown.couponDiscount)}`}
                  accent="text-emerald-600"
                />
              )}
              {breakdown.couponApplied && breakdown.couponApplied.type === "free_shipping" && (
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
              <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2">
                <span className="font-bold text-slate-900">Total</span>
                <span className="text-lg font-extrabold text-brand-600">
                  {formatBs(breakdown.total)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Ir a pagar <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </aside>
    </>
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
    <div className="flex items-center justify-between py-0.5 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className={`font-medium ${accent ?? "text-slate-700"}`}>{value}</span>
    </div>
  );
}
