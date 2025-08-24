import { Request, Response } from "express";
import { promoServices } from "../services";

export const createPromoController = async (req: Request, res: Response) => {
  try {
    const promo = await promoServices.createPromoService(req.body);
    res.json({ message: "Promo created successfully", promo });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const applyPromoToCartController = async (
  req: Request,
  res: Response
) => {
  try {
    const { token } = req.params;
    const { code } = req.body;
    const updatedCart = await promoServices.applyPromoToCartService(
      token,
      code
    );
    res.json({
      message: "Promo applied successfully",
      cart: updatedCart,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getPromoUsageController = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const result = await promoServices.getPromoUsageService(code);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
