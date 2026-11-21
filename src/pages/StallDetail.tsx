import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Star, Clock, Bike, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { STALLS } from "../data/seed";
import { useCart } from "../context/CartContext";
import { formatBs } from "../utils/format";
import type { Dish, Stall } from "../types";

export default function StallDetail() {
  const { slug } = useParams<{ slug: string }>();
  const stall = STALLS.find((s) => s.slug === slug);

  if (!stall) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <span className="text-4xl">🤔</span>
        <p className="text-sm text-slate-500">Puesto no encontrado.</p>
        <Link to="/" className="font-semibold text-brand-600 hover:underline">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return <StallContent stall={stall} />;
}

function StallContent({ stall }: { stall: Stall }) {
  const {
    items,
    requestAddFromStall,
    increment,
    decrement,
    openCart,
    count,
    clear,
    addDish,
  } = useCart();
  const [pending, setPending] = useState<Dish | null>(null);

  const handleAdd = (dish: Dish) => {
    const ok = requestAddFromStall(dish, stall);
    if (!ok) {
      setPending(dish);
    }
  };

  const confirmReplace = () => {
    if (!pending) return;
    // Replace cart with this stall's items, then add the dish.
    clear();
    addDish(pending, stall);
    setPending(null);
  };

  return (
    <div>
      <Link
        to="/"
        className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-brand-600"
      >
        <ArrowLeft className="h-4 w-4" /> Volver a puestos
      </Link>

      {/* Header */}
      <div className="relative mb-4 overflow-hidden rounded-3xl border border-slate-200 bg-white">
        <div className="flex h-32 items-center justify-center bg-gradient-to-br from-brand-50 to-amber-100 text-6xl sm:h-40">
          <span>{stall.emoji}</span>
        </div>
        <div className="p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-slate-900 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-white">
                  PUESTO {stall.number.toString().padStart(2, "0")}
                </span>
                {stall.promo && (
                  <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    PROMO
                  </span>
                )}
              </div>
              <h1 className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                {stall.name}
              </h1>
              <p className="text-sm font-medium text-slate-400">{stall.category}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 font-bold text-amber-600">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {stall.rating}
              </span>
              <span className="flex items-center gap-1 text-slate-600">
                <Clock className="h-4 w-4" /> {stall.deliveryTime} min
              </span>
              <span className="flex items-center gap-1 text-slate-600">
                <Bike className="h-4 w-4" />
                {stall.deliveryFee === 0
                  ? "Envío gratis"
                  : `${formatBs(stall.deliveryFee)} envío`}
              </span>
            </div>
          </div>
        </div>

        {stall.promo && (
          <div className="mx-4 mb-4 flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-2.5 text-sm text-brand-700">
            <span className="rounded-md bg-brand-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
              {stall.promo.tag}
            </span>
            <span className="font-medium">{stall.promo.label}</span>
          </div>
        )}
      </div>

      {/* Menu sections */}
      <div className="space-y-6">
        {stall.menu.map((section) => (
          <section key={section.section}>
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-500">
              {section.section}
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {section.dishes.map((dish) => {
                const inCart = items.find((i) => i.dishId === dish.id);
                return (
                  <div
                    key={dish.id}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {dish.name}
                      </p>
                      <p className="line-clamp-2 text-xs text-slate-400">
                        {dish.description}
                      </p>
                      <p className="mt-1 text-sm font-bold text-brand-600">
                        {formatBs(dish.price)}
                      </p>
                    </div>
                    {inCart ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => decrement(dish.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100"
                          aria-label="Quitar uno"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold">
                          {inCart.quantity}
                        </span>
                        <button
                          onClick={() => handleAdd(dish)}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-white hover:bg-brand-600"
                          aria-label="Agregar uno"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAdd(dish)}
                        className="flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 transition hover:bg-brand-100"
                      >
                        <Plus className="h-3.5 w-3.5" /> Agregar
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Floating cart button on mobile */}
      {count > 0 && (
        <button
          onClick={openCart}
          className="fixed bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full bg-brand-500 px-5 py-3 font-semibold text-white shadow-lg sm:hidden"
        >
          <ShoppingBag className="h-5 w-5" /> Ver carrito ({count})
        </button>
      )}

      {/* Cross-stall confirmation modal */}
      {pending && (
        <ReplaceConfirmModal
          onCancel={() => setPending(null)}
          onConfirm={confirmReplace}
          dishName={pending.name}
          stallName={stall.name}
        />
      )}
    </div>
  );
}

// Cross-stall confirmation modal
function ReplaceConfirmModal({
  onCancel,
  onConfirm,
  dishName,
  stallName,
}: {
  onCancel: () => void;
  onConfirm: () => void;
  dishName: string;
  stallName: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm animate-fade-in-up rounded-2xl bg-white p-5 text-center shadow-xl">
        <span className="text-4xl">🛒</span>
        <h3 className="mt-2 text-lg font-bold text-slate-900">
          Tu carrito tiene productos de otro puesto
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Solo puedes pedir de un puesto a la vez. Si agregas{" "}
          <span className="font-semibold text-slate-700">{dishName}</span> de{" "}
          <span className="font-semibold text-slate-700">{stallName}</span>,
          se vaciará tu carrito anterior.
        </p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
          >
            Vaciar y agregar
          </button>
        </div>
      </div>
    </div>
  );
}
