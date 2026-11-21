export type Category =
  | "Todos"
  | "Salteñas"
  | "Parrilla"
  | "Pizza"
  | "Hamburguesas"
  | "Sushi"
  | "Postres";

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  section: string;
}

export type PromoType = "percentage" | "free_shipping" | "fixed_discount";

export interface Promo {
  type: PromoType;
  /** percentage (20 = 20%), fixed discount amount (Bs), or minimum amount for free shipping */
  value: number;
  /** minimum order subtotal to apply the promo */
  minAmount?: number;
  label: string;
  /** short badge text e.g. "20% OFF" */
  tag: string;
}

export interface Stall {
  id: string;
  number: number;
  slug: string;
  name: string;
  category: string;
  rating: number;
  deliveryTime: number;
  deliveryFee: number;
  fromPrice: number;
  emoji: string;
  promo?: Promo;
  menu: { section: string; dishes: Dish[] }[];
}

export interface CartItem {
  dishId: string;
  stallId: string;
  stallName: string;
  name: string;
  price: number;
  quantity: number;
  section: string;
}

export type PaymentMethod = "Efectivo" | "QR" | "Tarjeta";

export type OrderStatus = "recibido" | "preparando" | "encamino" | "entregado";

export interface OrderItem {
  dishId: string;
  name: string;
  price: number;
  quantity: number;
}

export type CouponType = "percentage" | "free_shipping" | "fixed_discount";

export interface AppliedCoupon {
  code: string;
  type: CouponType;
  value: number;
  amount: number;
}

export interface Order {
  id: string;
  code: string;
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
  status: OrderStatus;
  createdAt: number;
  /** timestamps at which each status should become active [t_recibido, t_preparando, t_encamino, t_entregado] */
  transitions: number[];
  /** statuses for which a notification has already been fired */
  notifiedStatuses: OrderStatus[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: number;
  read: boolean;
  orderId?: string;
}

export interface Coupon {
  code: string;
  type: CouponType;
  value: number;
  description: string;
}

export interface PriceBreakdown {
  subtotal: number;
  promoDiscount: number;
  couponDiscount: number;
  shipping: number;
  total: number;
  promoApplied: boolean;
  couponApplied: AppliedCoupon | null;
}

export const STATUS_ORDER: OrderStatus[] = [
  "recibido",
  "preparando",
  "encamino",
  "entregado",
];

export const STATUS_LABELS: Record<OrderStatus, string> = {
  recibido: "Pedido recibido",
  preparando: "Preparando tu pedido",
  encamino: "En camino",
  entregado: "Entregado",
};

export const STATUS_EMOJI: Record<OrderStatus, string> = {
  recibido: "📝",
  preparando: "👨‍🍳",
  encamino: "🛵",
  entregado: "✅",
};
