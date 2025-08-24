import { z } from "zod";

export const createPromoValidation = z.object({
  body: z.object({
    code: z.string().min(1),
    type: z.enum(["PERCENT", "FIXED"]),
    value: z.number().min(0),
    startsAt: z.string(),
    endsAt: z.string(),
    active: z.boolean().optional(),
  }),
});

export const applyPromoValidation = z.object({
  body: z.object({ code: z.string().min(1) }),
  params: z.object({ token: z.string().uuid() }),
});
