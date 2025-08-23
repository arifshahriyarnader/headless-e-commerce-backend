import { Request, Response } from "express";
import { productServices } from "../services";

import { ProductValidation } from "../validations/product.validation";

export const createProductController = async (req: Request, res: Response) => {
  try {
    const parsed = ProductValidation.parse(req.body);
    const product = await productServices.createProductService(parsed);
    res.status(201).json(product);
  } catch (error: any) {
    res.status(400).json({ error: error.errors || error.message });
  }
};
