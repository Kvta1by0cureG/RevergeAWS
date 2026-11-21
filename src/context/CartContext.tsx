import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, Dish, Stall } from "../types";
import { STORAGE_KEYS, loadState, saveState } from "../utils/storage";
import { calculatePrice, findCoupon, itemCount } from "../utils/pricing";
import { STALLS } from "../data/seed";

interface CartContextValue {
  items: CartItem[];
  stallId: string | null;
  stall: Stall | undefined;
  isOpen: boolean;
  couponCode: string | null;
  couponMessage: { type: "success" | "error"; text: string } | null;
  breakdown: ReturnType<typeof calculatePrice>;
  count: number;
  openCart: () => void;
  closeCart: () => void;
  addDish: (dish: Dish, stall: Stall) => number;
  setQuantity: (dishId: string, qty: number) => void;
  increment: (dishId: string) => void;
  decrement: (dishId: string) => void;
  removeItem: (dishId: string) => void;
  clear: () => void;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
  /** when adding from a different stall, returns false so caller can ask for confirmation */
  requestAddFromStall: (dish: Dish, stall: Stall) => boolean;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() =>
    loadState<CartItem[]>(STORAGE_KEYS.cart, []),
  );
  const [couponCode, setCouponCode] = useState<string | null>(() =>
    loadState<string | null>(STORAGE_KEYS.coupon, null),
  );
  const [isOpen, setIsOpen] = useState(false);
  const [couponMessage, setCouponMessage] = useState<
    { type: "success" | "error"; text: string } | null
  >(null);

  useEffect(() => {
    saveState(STORAGE_KEYS.cart, items);
  }, [items]);

  useEffect(() => {
    saveState(STORAGE_KEYS.coupon, couponCode);
  }, [couponCode]);

  const stallId = items.length > 0 ? items[0].stallId : null;
  const stall = useMemo(
    () => STALLS.find((s) => s.id === stallId),
    [stallId],
  );

  const breakdown = useMemo(
    () => calculatePrice({ items, stall, couponCode }),
    [items, stall, couponCode],
  );

  const addDish = (dish: Dish, s: Stall) => {
    let addedQty = 0;
    setItems((prev) => {
      const existing = prev.find((i) => i.dishId === dish.id);
      if (existing) {
        addedQty = existing.quantity + 1;
        return prev.map((i) =>
          i.dishId === dish.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      addedQty = 1;
      return [
        ...prev,
        {
          dishId: dish.id,
          stallId: s.id,
          stallName: s.name,
          name: dish.name,
          price: dish.price,
          quantity: 1,
          section: dish.section,
        },
      ];
    });
    return addedQty;
  };

  // Returns true if the add can proceed directly (same stall or empty cart),
  // false if a confirmation is needed because the cart belongs to a different stall.
  const requestAddFromStall = (dish: Dish, s: Stall): boolean => {
    if (items.length === 0) {
      addDish(dish, s);
      return true;
    }
    if (items[0].stallId === s.id) {
      addDish(dish, s);
      return true;
    }
    return false; // different stall -> caller must confirm
  };

  const setQuantity = (dishId: string, qty: number) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((i) => i.dishId !== dishId);
      return prev.map((i) => (i.dishId === dishId ? { ...i, quantity: qty } : i));
    });
  };

  const increment = (dishId: string) =>
    setItems((prev) =>
      prev.map((i) =>
        i.dishId === dishId ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    );

  const decrement = (dishId: string) =>
    setItems((prev) =>
      prev
        .map((i) =>
          i.dishId === dishId ? { ...i, quantity: i.quantity - 1 } : i,
        )
        .filter((i) => i.quantity > 0),
    );

  const removeItem = (dishId: string) =>
    setItems((prev) => prev.filter((i) => i.dishId !== dishId));

  const clear = () => {
    setItems([]);
    setCouponCode(null);
    setCouponMessage(null);
  };

  const applyCoupon = (code: string) => {
    const coupon = findCoupon(code);
    if (!coupon) {
      setCouponMessage({ type: "error", text: `El cupón "${code}" no es válido.` });
      return;
    }
    setCouponCode(coupon.code);
    setCouponMessage({
      type: "success",
      text: `¡Cupón "${coupon.code}" aplicado! ${coupon.description}.`,
    });
  };

  const removeCoupon = () => {
    setCouponCode(null);
    setCouponMessage(null);
  };

  const value: CartContextValue = {
    items,
    stallId,
    stall,
    isOpen,
    couponCode,
    couponMessage,
    breakdown,
    count: itemCount(items),
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addDish,
    setQuantity,
    increment,
    decrement,
    removeItem,
    clear,
    applyCoupon,
    removeCoupon,
    requestAddFromStall,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
