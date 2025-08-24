import { Request, Response } from "express";
import { checkoutServices } from "../services";

export const createCheckoutController = {
  async createOrder(req: Request, res: Response) {
    try {
      const { cartId } = req.body;
      const order = await checkoutServices.createCheckoutService.createOrder(
        cartId
      );
      res.status(201).json({ message: "Order created successfully", order });
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Checkout failed" });
    }
  },
};
