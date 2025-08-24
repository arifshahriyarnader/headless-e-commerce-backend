import { z } from "zod";

export const updatePaymentValidation = z.object({
  body: z.object({
    orderId: z.string().min(1, { message: "orderId is required" }),
    paymentStatus: z.enum(["PAID", "FAILED"]).refine(
      (val) => ["PAID", "FAILED"].includes(val),
      { message: "Invalid payment status" }
    ),
  }),
});
