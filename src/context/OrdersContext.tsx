import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type {
  AppliedCoupon,
  Order,
  OrderItem,
  OrderStatus,
  PaymentMethod,
} from "../types";
import { STORAGE_KEYS, loadState, saveState } from "../utils/storage";
import { generateId, generateOrderCode } from "../utils/orderCode";

interface CreateOrderInput {
  stallId: string;
  stallName: string;
  items: OrderItem[];
  subtotal: number;
  promoDiscount: number;
  coupon?: AppliedCoupon;
  shipping: number;
  total: number;
  customerName: string;
  phone: string;
  address: string;
  notes: string;
  payment: PaymentMethod;
  lat: number;
  lng: number;
}

interface OrdersContextValue {
  orders: Order[];
  createOrder: (input: CreateOrderInput) => Order;
  getOrder: (id: string) => Order | undefined;
  updateStatus: (id: string, status: OrderStatus) => void;
  /** Advance an order to a status and record that its notification was fired. */
  advanceOrder: (id: string, status: OrderStatus) => void;
}

const OrdersContext = createContext<OrdersContextValue | undefined>(undefined);

// progression timing (ms) — offset from createdAt for each status
const PROGRESS_OFFSETS = [0, 15000, 32000, 50000]; // recibido, preparando, encamino, entregado

export function computeTransitions(createdAt: number): number[] {
  return PROGRESS_OFFSETS.map((off) => createdAt + off);
}

export function statusForTime(
  transitions: number[],
  now: number,
): OrderStatus {
  let current: OrderStatus = "recibido";
  const order: OrderStatus[] = ["recibido", "preparando", "encamino", "entregado"];
  for (let i = 0; i < transitions.length; i++) {
    if (now >= transitions[i]) current = order[i];
  }
  return current;
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() =>
    loadState<Order[]>(STORAGE_KEYS.orders, []),
  );

  useEffect(() => {
    saveState(STORAGE_KEYS.orders, orders);
  }, [orders]);

  const createOrder = useCallback((input: CreateOrderInput): Order => {
    const createdAt = Date.now();
    const transitions = computeTransitions(createdAt);
    const order: Order = {
      id: generateId(),
      code: generateOrderCode(),
      ...input,
      status: "recibido",
      createdAt,
      transitions,
      notifiedStatuses: ["recibido"],
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  }, []);

  const getOrder = useCallback(
    (id: string) => orders.find((o) => o.id === id),
    [orders],
  );

  const updateStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o)),
    );
  }, []);

  const advanceOrder = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const notifiedStatuses = o.notifiedStatuses.includes(status)
          ? o.notifiedStatuses
          : [...o.notifiedStatuses, status];
        return { ...o, status, notifiedStatuses };
      }),
    );
  }, []);

  const value: OrdersContextValue = {
    orders,
    createOrder,
    getOrder,
    updateStatus,
    advanceOrder,
  };

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
}
