import type {
  AppliedCoupon,
  CartItem,
  Coupon,
  PriceBreakdown,
  Promo,
  Stall,
} from "../types";
import { COUPONS } from "../data/seed";

export function findCoupon(code: string): Coupon | undefined {
  return COUPONS.find((c) => c.code.toLowerCase() === code.trim().toLowerCase());
}

function applyPromo(
  subtotal: number,
  baseShipping: number,
  promo: Promo | undefined,
): { discount: number; shipping: number } {
  if (!promo) return { discount: 0, shipping: baseShipping };
  const min = promo.minAmount ?? 0;
  if (subtotal < min) return { discount: 0, shipping: baseShipping };

  if (promo.type === "percentage") {
    return { discount: (subtotal * promo.value) / 100, shipping: baseShipping };
  }
  if (promo.type === "fixed_discount") {
    return { discount: Math.min(promo.value, subtotal), shipping: baseShipping };
  }
  if (promo.type === "free_shipping") {
    return { discount: 0, shipping: 0 };
  }
  return { discount: 0, shipping: baseShipping };
}

function applyCoupon(
  subtotal: number,
  shipping: number,
  coupon: Coupon,
): AppliedCoupon {
  if (coupon.type === "percentage") {
    const amount = (subtotal * coupon.value) / 100;
    return { code: coupon.code, type: coupon.type, value: coupon.value, amount };
  }
  if (coupon.type === "fixed_discount") {
    const amount = Math.min(coupon.value, subtotal);
    return { code: coupon.code, type: coupon.type, value: coupon.value, amount };
  }
  // free_shipping handled at total level
  return { code: coupon.code, type: coupon.type, value: 0, amount: 0 };
}

export interface PricingInput {
  items: CartItem[];
  stall: Stall | undefined;
  couponCode: string | null;
}

export function calculatePrice(input: PricingInput): PriceBreakdown {
  const { items, stall, couponCode } = input;
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const baseShipping = stall ? stall.deliveryFee : 0;

  const promoResult = applyPromo(subtotal, baseShipping, stall?.promo);
  let shipping = promoResult.shipping;
  const promoDiscount = promoResult.discount;

  const coupon = couponCode ? findCoupon(couponCode) : undefined;
  let couponApplied: AppliedCoupon | null = null;
  let couponDiscount = 0;

  if (coupon) {
    if (coupon.type === "free_shipping") {
      const waived = shipping; // amount of shipping actually removed by the coupon
      shipping = 0;
      couponApplied = {
        code: coupon.code,
        type: coupon.type,
        value: 0,
        amount: waived,
      };
    } else {
      couponApplied = applyCoupon(subtotal, shipping, coupon);
      couponDiscount = couponApplied.amount;
    }
  }

  const total = Math.max(0, subtotal - promoDiscount - couponDiscount + shipping);

  return {
    subtotal,
    promoDiscount,
    couponDiscount,
    shipping,
    total,
    promoApplied: promoResult.discount > 0 || promoResult.shipping === 0,
    couponApplied,
  };
}

export function itemCount(items: CartItem[]): number {
  return items.reduce((s, i) => s + i.quantity, 0);
}
