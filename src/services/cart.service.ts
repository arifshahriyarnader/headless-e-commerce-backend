import { v4 as uuidv4 } from "uuid";
import Cart, { ICart } from "../models/cart.model";

export const createOrFetchCartService = async (
  token?: string
): Promise<{ token: string; cart: ICart }> => {
  if (!token) {
    token = uuidv4();
  }
  let cart = await Cart.findOne({ token });
  if (!cart) {
    cart = await Cart.create({ token, items: [] });
  }

  return { token, cart };
};
