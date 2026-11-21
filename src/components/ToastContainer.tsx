import { X, BellRing } from "lucide-react";
import { useToast } from "../context/ToastContext";

export default function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="animate-toast-in rounded-xl border border-slate-200 bg-white p-3 shadow-lg"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
              <BellRing className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-900">{t.title}</p>
              <p className="mt-0.5 text-xs text-slate-500">{t.message}</p>
            </div>
            <button
              onClick={() => dismissToast(t.id)}
              aria-label="Cerrar notificación"
              className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
