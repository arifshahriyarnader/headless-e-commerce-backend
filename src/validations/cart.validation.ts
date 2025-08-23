import { Types } from "mongoose";
import { z } from "zod";

const objectId = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), { message: "Invalid ObjectId" });

export const createOrFetchCartValidation = z.object({
  body: z.object({
    token: z.string().optional(),
  }),
});


export const addItemValidation = z.object({
  params: z.object({
    token: z.string(),
  }),
  body: z.object({
    productId: objectId,
    variantId: objectId,
    quantity: z.number().min(1),
  }),
});
