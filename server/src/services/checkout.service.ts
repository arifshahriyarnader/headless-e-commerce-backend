import { Cart, Order, Product } from "../models";
import { Types } from "mongoose";

export const createCheckoutService = {
  async createOrder(cartId: string) {
    const cart = await Cart.findById(cartId).populate("promo");
    if (!cart) throw new Error("Cart not found");
    if (!cart.items.length) throw new Error("Cart is empty");

    let subtotal = 0;
    const validatedItems: {
      productId: string;
      variantId: string;
      title: string;
      sku: string;
      unitPrice: number;
      quantity: number;
    }[] = [];

    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);

      const variant = product.variants.find(
        (v: any) => v._id.toString() === item.variantId.toString()
      );

      if (!variant)
        throw new Error(
          `Variant ${item.variantId} not found for product ${product.title}`
        );

      const unitPrice = variant.price;
      subtotal += unitPrice * item.quantity;

      validatedItems.push({
        productId: (product._id as Types.ObjectId).toString(),
        variantId: (variant._id as Types.ObjectId).toString(),
        title: variant.title,
        sku: variant.sku,
        unitPrice,
        quantity: item.quantity,
      });
    }

    
    let discount = 0;
    let appliedPromo: string | undefined;

    if (cart.promo) {
      const promo = cart.promo as any; 
      const now = new Date();
      if (promo.startsAt > now || promo.endsAt < now) {
        throw new Error("Promo code not valid at this time");
      }

      if (promo.type === "PERCENT") discount = (subtotal * promo.value) / 100;
      else if (promo.type === "FIXED") discount = promo.value;

      appliedPromo = promo.code;
    }

    const total = Math.max(subtotal - discount, 0);

    const order = new Order({
      cartId,
      items: validatedItems,
      subtotal,
      discount,
      total,
      promoCode: appliedPromo,
      status: "PLACED",
      paymentStatus: "PENDING",
    });

    await order.save();
    return order;
  },
};
