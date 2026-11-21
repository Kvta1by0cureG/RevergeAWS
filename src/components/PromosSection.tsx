import { Percent, Truck, BadgeDollarSign } from "lucide-react";
import type { Promo, Stall } from "../types";

interface PromosSectionProps {
  stalls: Stall[];
}

function promoVisual(promo: Promo) {
  if (promo.type === "percentage") {
    return {
      icon: <Percent className="h-5 w-5" />,
      headline: `${promo.value}% DE DESCUENTO`,
    };
  }
  if (promo.type === "free_shipping") {
    return {
      icon: <Truck className="h-5 w-5" />,
      headline: `ENVÍO GRATIS DESDE Bs ${promo.minAmount ?? 0}`,
    };
  }
  return {
    icon: <BadgeDollarSign className="h-5 w-5" />,
    headline: `Bs ${promo.value} DE DESCUENTO DESDE Bs ${promo.minAmount ?? 0}`,
  };
}

const PALETTES = [
  "from-rose-500 to-orange-500",
  "from-amber-500 to-brand-500",
  "from-sky-500 to-indigo-500",
  "from-emerald-500 to-teal-500",
  "from-fuchsia-500 to-pink-500",
  "from-violet-500 to-purple-500",
];

export default function PromosSection({ stalls }: PromosSectionProps) {
  const promos = stalls.filter((s) => s.promo).slice(0, 6);

  if (promos.length === 0) return null;

  return (
    <section className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900">
          Promociones de noviembre
        </h2>
        <span className="rounded-full bg-brand-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-700">
          Hasta fin de mes
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {promos.map((stall, idx) => {
          const promo = stall.promo!;
          const visual = promoVisual(promo);
          const palette = PALETTES[idx % PALETTES.length];
          return (
            <div
              key={stall.id}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${palette} p-4 text-white shadow-sm`}
            >
              <span className="absolute right-3 top-3 rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide backdrop-blur">
                Hasta fin de mes
              </span>
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                  {visual.icon}
                </span>
              </div>
              <p className="text-lg font-extrabold leading-tight">
                {visual.headline}
              </p>
              <p className="mt-1 text-xs text-white/90">{stall.name}</p>
              <p className="mt-2 text-sm font-semibold">{promo.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
