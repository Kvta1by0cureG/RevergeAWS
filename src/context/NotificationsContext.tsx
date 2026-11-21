import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AppNotification } from "../types";
import { STORAGE_KEYS, loadState, saveState } from "../utils/storage";
import { generateId } from "../utils/orderCode";

interface NotificationsContextValue {
  notifications: AppNotification[];
  unreadCount: number;
  nativeNotifEnabled: boolean;
  panelOpen: boolean;
  togglePanel: () => void;
  closePanel: () => void;
  addNotification: (n: Omit<AppNotification, "id" | "time" | "read">) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  enableNativeNotif: () => Promise<void>;
  fireNativeNotif: (title: string, body: string) => void;
}

const NotificationsContext = createContext<
  NotificationsContextValue | undefined
>(undefined);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>(() =>
    loadState<AppNotification[]>(STORAGE_KEYS.notifications, []),
  );
  const [panelOpen, setPanelOpen] = useState(false);
  const [nativeNotifEnabled, setNativeNotifEnabled] = useState<boolean>(() =>
    loadState<boolean>(STORAGE_KEYS.nativeNotif, false),
  );

  useEffect(() => {
    saveState(STORAGE_KEYS.notifications, notifications);
  }, [notifications]);

  useEffect(() => {
    saveState(STORAGE_KEYS.nativeNotif, nativeNotifEnabled);
  }, [nativeNotifEnabled]);

  const addNotification = useCallback(
    (n: Omit<AppNotification, "id" | "time" | "read">) => {
      const notif: AppNotification = {
        ...n,
        id: generateId(),
        time: Date.now(),
        read: false,
      };
      setNotifications((prev) => [notif, ...prev].slice(0, 50));
    },
    [],
  );

  const markRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const enableNativeNotif = useCallback(async () => {
    if (!("Notification" in window)) {
      setNativeNotifEnabled(false);
      return;
    }
    try {
      const perm = await Notification.requestPermission();
      setNativeNotifEnabled(perm === "granted");
    } catch {
      setNativeNotifEnabled(false);
    }
  }, []);

  const fireNativeNotif = useCallback(
    (title: string, body: string) => {
      if (
        nativeNotifEnabled &&
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        try {
          new Notification(title, { body });
        } catch {
          // ignore
        }
      }
    },
    [nativeNotifEnabled],
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const value: NotificationsContextValue = {
    notifications,
    unreadCount,
    nativeNotifEnabled,
    panelOpen,
    togglePanel: () => setPanelOpen((p) => !p),
    closePanel: () => setPanelOpen(false),
    addNotification,
    markRead,
    markAllRead,
    enableNativeNotif,
    fireNativeNotif,
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx)
    throw new Error("useNotifications must be used within NotificationsProvider");
  return ctx;
}
