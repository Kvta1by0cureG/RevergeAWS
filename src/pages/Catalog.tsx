import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { STALLS, CATEGORIES, CATEGORIES_EMOJI } from "../data/seed";
import StallCard from "../components/StallCard";
import PromosSection from "../components/PromosSection";

export default function Catalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("Todos");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return STALLS.filter((s) => {
      const matchesCategory = category === "Todos" || s.category === category;
      if (!matchesCategory) return false;
      if (!q) return true;
      const inName = s.name.toLowerCase().includes(q);
      const inCat = s.category.toLowerCase().includes(q);
      const inDishes = s.menu.some((sec) =>
        sec.dishes.some((d) => {
          return (
            d.name.toLowerCase().includes(q) ||
            d.description.toLowerCase().includes(q)
          );
        }),
      );
      return inName || inCat || inDishes;
    });
  }, [query, category]);

  return (
    <div>
      {/* Hero search */}
      <div className="relative mb-5 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 to-amber-500 p-6 text-white sm:p-8">
        <div className="max-w-xl">
          <h1 className="text-2xl font-extrabold leading-tight sm:text-3xl">
            Pide tu comida favorita en Cochabamba 🍴
          </h1>
          <p className="mt-1 text-sm text-white/90">
            Salteñas, parrilla, pizza, sushi y más. Entregamos rápido a tu puerta.
          </p>
          <div className="mt-4 flex items-center gap-2 rounded-full bg-white p-1.5 shadow-lg">
            <Search className="ml-2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busca restaurantes o tipo de comida"
              className="w-full bg-transparent py-1.5 text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>
        <span className="pointer-events-none absolute -bottom-4 right-4 text-7xl opacity-30 sm:text-8xl">
          🍽️
        </span>
      </div>

      {/* Promos */}
      <PromosSection stalls={STALLS} />

      {/* Category tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition ${
              category === cat
                ? "bg-brand-500 text-white shadow-sm"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            <span>{CATEGORIES_EMOJI[cat]}</span>
            {cat}
          </button>
        ))}
      </div>

      {/* Section title */}
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-base font-bold text-slate-900">Puestos destacados</h2>
        <span className="text-xs text-slate-400">
          {filtered.length} resultado{filtered.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <span className="text-4xl">🔍</span>
          <p className="text-sm font-medium text-slate-500">
            No encontramos puestos para tu búsqueda.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setCategory("Todos");
            }}
            className="text-sm font-semibold text-brand-600 hover:underline"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((stall) => (
            <StallCard key={stall.id} stall={stall} />
          ))}
        </div>
      )}
    </div>
  );
}
