import { z } from "zod";

export const VariantValidation = z.object({
  sku: z.string().min(1, "SKU is required"),
  title: z.string().min(1, "Variant Title is required"),
  price: z.number().min(0, "Price must be positive"),
  attributes: z.record(z.string(), z.string()).optional(),
});

export const ProductValidation = z.object({
  title: z.string().min(1, "Product title is required"),
  description: z.string().optional(),
  variants: z.array(VariantValidation).optional(),
  active: z.boolean().optional(),
});

export type ProductInput = z.infer<typeof ProductValidation>;
