import { z } from "zod";

export const createCheckoutValidation = z.object({
  body: z.object({
    cartId: z.string().min(1, { message: "Cart ID is required" }),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});
