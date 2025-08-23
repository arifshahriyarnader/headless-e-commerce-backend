import { z } from "zod";


export const createOrFetchCartValidation = z.object({
  body: z.object({
    token: z.string().optional(),
  }),
});
