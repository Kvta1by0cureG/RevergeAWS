import { useEffect, useRef } from "react";
import { useOrders, statusForTime } from "../context/OrdersContext";
import { useNotifications } from "../context/NotificationsContext";
import { useToast } from "../context/ToastContext";
import type { OrderStatus } from "../types";
import { STATUS_LABELS } from "../types";

const STATUS_ORDER_LIST: OrderStatus[] = [
  "recibido",
  "preparando",
  "encamino",
  "entregado",
];

const NOTIF_MESSAGES: Record<
  OrderStatus,
  (stallName: string) => { title: string; message: string }
> = {
  recibido: (s) => ({
    title: "Pedido recibido",
    message: `${s} recibió tu pedido y lo está preparando.`,
  }),
  preparando: (s) => ({
    title: "Preparando tu pedido",
    message: `${s} ya está preparando tu pedido en la cocina.`,
  }),
  encamino: (s) => ({
    title: "Tu pedido está en camino",
    message: `Tu pedido de ${s} salió rumbo a tu dirección.`,
  }),
  entregado: (s) => ({
    title: "¡Entregado! Buen provecho",
    message: `Tu pedido de ${s} fue entregado. ¡Disfrútalo!`,
  }),
};

/**
 * Background progression that advances orders through their 4 statuses
 * based on persisted timestamps. Works across reloads and navigation.
 */
export function useOrderProgression() {
  const { orders, advanceOrder } = useOrders();
  const { addNotification, fireNativeNotif } = useNotifications();
  const { showToast } = useToast();

  // keep latest references so the interval callback always sees fresh state
  const refs = useRef({ orders, advanceOrder, addNotification, fireNativeNotif, showToast });
  refs.current = { orders, advanceOrder, addNotification, fireNativeNotif, showToast };

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const {
        orders: currentOrders,
        advanceOrder: advance,
        addNotification: addN,
        fireNativeNotif: fire,
        showToast: toast,
      } = refs.current;

      const firedThisTick = new Set<string>();

      for (const order of currentOrders) {
        if (order.status === "entregado") continue;
        const target = statusForTime(order.transitions, now);
        const targetIdx = STATUS_ORDER_LIST.indexOf(target);
        const currentIdx = STATUS_ORDER_LIST.indexOf(order.status);

        if (targetIdx > currentIdx) {
          for (let i = currentIdx + 1; i <= targetIdx; i++) {
            const status = STATUS_ORDER_LIST[i];
            advance(order.id, status);

            const fireKey = `${order.id}:${status}`;
            if (!order.notifiedStatuses.includes(status) && !firedThisTick.has(fireKey)) {
              firedThisTick.add(fireKey);
              const m = NOTIF_MESSAGES[status](order.stallName);
              addN({ title: m.title, message: m.message, orderId: order.id });
              toast(m.title, m.message);
              fire(m.title, m.message);
            }
          }
        }
      }
    };

    const interval = setInterval(tick, 2000);
    tick();
    return () => clearInterval(interval);
  }, []);
}
