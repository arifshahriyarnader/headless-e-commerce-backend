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

export const getAllProductController = async (req: Request, res: Response) => {
  try {
    const products = await productServices.getAllProductsService();
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductByIdController = async (req: Request, res: Response) => {
  try {
    const product = await productServices.getProductByIdService(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error: any) {
    if (error.message === "Invalid product ID") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const parsed = ProductValidation.partial().parse(req.body);
    const updateProduct = await productServices.updateProductService(
      req.params.id,
      parsed
    );
    if (!updateProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(updateProduct);
  } catch (error: any) {
    res.status(400).json({ error: error.errors || error.message });
  }
};
