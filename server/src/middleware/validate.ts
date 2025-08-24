import { ZodObject, ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodObject<Record<string, ZodTypeAny>>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (e: any) {
      return res.status(400).json({ error: e.errors });
    }
  };
