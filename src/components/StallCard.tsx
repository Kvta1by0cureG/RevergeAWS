import { Link } from "react-router-dom";
import { Star, Clock, Bike } from "lucide-react";
import type { Stall } from "../types";
import { formatBs } from "../utils/format";

export default function StallCard({ stall }: { stall: Stall }) {
  return (
    <Link
      to={`/r/${stall.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      {/* Banner */}
      <div className="relative flex h-28 items-center justify-center bg-gradient-to-br from-brand-50 to-amber-50 text-5xl">
        <span>{stall.emoji}</span>
        <span className="absolute left-3 top-3 rounded-md bg-slate-900/80 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-white">
          PUESTO {stall.number.toString().padStart(2, "0")}
        </span>
        {stall.promo && (
          <span className="absolute right-3 top-3 rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-bold text-white shadow">
            PROMO
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-600">
            {stall.name}
          </h3>
          <span className="flex flex-shrink-0 items-center gap-0.5 rounded-md bg-amber-50 px-1.5 py-0.5 text-xs font-bold text-amber-600">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {stall.rating}
          </span>
        </div>

        <p className="text-xs font-medium text-slate-400">{stall.category}</p>

        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {stall.deliveryTime} min
          </span>
          <span className="flex items-center gap-1">
            <Bike className="h-3.5 w-3.5" />
            {stall.deliveryFee === 0 ? (
              "Envío gratis"
            ) : (
              `${formatBs(stall.deliveryFee)} envío`
            )}
          </span>
        </div>

        {stall.promo && (
          <p className="line-clamp-1 rounded-lg bg-brand-50 px-2 py-1 text-[11px] font-medium text-brand-700">
            {stall.promo.tag} · {stall.promo.label}
          </p>
        )}

        <p className="mt-auto pt-1 text-xs text-slate-500">
          Desde <span className="font-bold text-slate-800">{formatBs(stall.fromPrice)}</span>
        </p>
      </div>
    </Link>
  );
}
