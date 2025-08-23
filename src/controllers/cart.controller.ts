import { Request, Response } from "express";
import { cartServices } from "../services";

export const createOrFetchCartController = async (
  req: Request,
  res: Response
) => {
  try {
    const { token } = req.body;
    const result = await cartServices.createOrFetchCartService(token);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
