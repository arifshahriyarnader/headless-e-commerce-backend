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
