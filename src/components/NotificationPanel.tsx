import { useNavigate } from "react-router-dom";
import { Bell, BellRing, Check, X } from "lucide-react";
import { useNotifications } from "../context/NotificationsContext";
import { formatTime } from "../utils/format";

export default function NotificationPanel() {
  const {
    notifications,
    unreadCount,
    panelOpen,
    closePanel,
    markRead,
    markAllRead,
    nativeNotifEnabled,
    enableNativeNotif,
  } = useNotifications();
  const navigate = useNavigate();

  if (!panelOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={closePanel}
        aria-hidden
      />
      <div className="fixed right-0 top-16 z-50 mx-4 w-[min(380px,calc(100vw-2rem))] animate-fade-in-up rounded-2xl border border-slate-200 bg-white shadow-xl sm:right-4">
        <div className="flex items-center justify-between border-b border-slate-100 p-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-brand-600" />
            <h2 className="font-bold text-slate-900">Notificaciones</h2>
            {unreadCount > 0 && (
              <span className="rounded-full bg-brand-100 px-2 py-0.5 text-xs font-semibold text-brand-700">
                {unreadCount} sin leer
              </span>
            )}
          </div>
          <button
            onClick={closePanel}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
          <button
            onClick={enableNativeNotif}
            disabled={nativeNotifEnabled}
            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
              nativeNotifEnabled
                ? "cursor-default bg-emerald-50 text-emerald-700"
                : "bg-brand-500 text-white hover:bg-brand-600"
            }`}
          >
            <BellRing className="h-4 w-4" />
            {nativeNotifEnabled
              ? "Avisos del navegador activados"
              : "Activar avisos del navegador"}
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="p-6 text-center text-sm text-slate-400">
              No tienes notificaciones todavía.
            </p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className={`flex gap-3 p-3 transition hover:bg-slate-50 ${
                    !n.read ? "bg-brand-50/40" : ""
                  }`}
                >
                  <span
                    className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${
                      n.read ? "bg-transparent" : "bg-brand-500"
                    }`}
                  />
                  <button
                    onClick={() => {
                      markRead(n.id);
                      if (n.orderId) {
                        closePanel();
                        navigate(`/orders/${n.orderId}`);
                      }
                    }}
                    className="min-w-0 flex-1 text-left"
                  >
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {n.title}
                    </p>
                    <p className="line-clamp-2 text-xs text-slate-500">
                      {n.message}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      {formatTime(n.time)}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {notifications.length > 0 && (
          <div className="flex items-center justify-end gap-2 border-t border-slate-100 p-3">
            <button
              onClick={markAllRead}
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100"
            >
              <Check className="h-3.5 w-3.5" /> Marcar todo leído
            </button>
          </div>
        )}
      </div>
    </>
  );
}
