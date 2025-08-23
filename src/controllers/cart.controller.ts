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

export const addCartItemController = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { productId, variantId, quantity } = req.body;
    const cart = await cartServices.addItemToCartService(
      token,
      productId,
      variantId,
      quantity
    );
    res.json(cart);
  } catch (error: any) {
    if (error.message === "Cart not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

export const updateCartItemController = async (req: Request, res: Response) => {
  try {
    const { token, itemId } = req.params;
    const { quantity } = req.body;
    const cart = await cartServices.updateCartItemService(
      token,
      itemId,
      quantity
    );

    res.json(cart);
  } catch (error: any) {
    if (
      error.message === "Cart not found" ||
      error.message === "Item not found"
    ) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};
