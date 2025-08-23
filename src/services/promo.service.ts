import { Promo } from "../models";

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
