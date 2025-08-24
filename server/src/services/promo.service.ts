import { Types } from "mongoose";
import { Cart, Order, Promo } from "../models";

export const createPromoService = async (data: {
  code: string;
  type: "PERCENT" | "FIXED";
  value: number;
  startsAt?: Date;
  endsAt?: Date;
  active?: boolean;
}) => {
  const existingPromo = await Promo.findOne({ code: data.code.toUpperCase() });
  if (existingPromo) throw new Error("Promo code already exists");
  const promo = await Promo.create({
    code: data.code.toUpperCase(),
    type: data.type,
    value: data.value,
    startsAt: data.startsAt ? new Date(data.startsAt) : new Date(),
    endsAt: data.endsAt
      ? new Date(data.endsAt)
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    active: data.active ?? true,
  });

  return promo;
};

export const applyPromoToCartService = async (token: string, code: string) => {
  const cart = await Cart.findOne({ token });
  if (!cart) throw new Error("Cart not found");
  const promo = await Promo.findOne({
    code: new RegExp(`^${code}$`, "i"),
    active: true,
  });
  if (!promo) throw new Error("Promo not found or inactive");
  const now = new Date();
  if (now < promo.startsAt || now > promo.endsAt) {
    throw new Error("Promo code expired or not yet valid");
  }
  cart.promo = promo._id as Types.ObjectId;
  await cart.save();

  return cart.populate("promo");
};

export const getPromoUsageService = async (code: string) => {
  const promo = await Promo.findOne({ code: code.toUpperCase() });
  if (!promo) throw new Error("Promo not found");
  const usage = await Cart.aggregate([
    { $match: { promo: promo._id } },
    { $count: "totalUsage" },
  ]);
  return {
    code: promo.code,
    totalUsage: usage[0]?.totalUsage || 0,
  };
};

export const getAllPromosService = async () => {
  return await Promo.find();
};


