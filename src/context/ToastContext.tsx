import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { generateId } from "../utils/orderCode";

export interface ToastItem {
  id: string;
  title: string;
  message: string;
}

interface ToastContextValue {
  toasts: ToastItem[];
  showToast: (title: string, message: string) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (title: string, message: string) => {
      const id = generateId();
      setToasts((prev) => [...prev, { id, title, message }]);
      // auto dismiss after 6 seconds
      setTimeout(() => dismissToast(id), 6000);
    },
    [dismissToast],
  );

  const value: ToastContextValue = { toasts, showToast, dismissToast };

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
