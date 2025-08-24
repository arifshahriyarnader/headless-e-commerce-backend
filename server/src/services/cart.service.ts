import { v4 as uuidv4 } from "uuid";
import Cart, { ICart, ILineItem } from "../models/cart.model";
import { Types } from "mongoose";

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

export const addItemToCartService = async (
  token: string,
  productId: string,
  variantId: string,
  quantity: number
) => {
  let cart = await Cart.findOne({ token });
  if (!cart) throw new Error("Cart not found");

  const productObjectId = new Types.ObjectId(productId);
  const variantObjectId = new Types.ObjectId(variantId);

  const existingItem = cart.items.find(
    (item) =>
      item.productId.toString() === productObjectId.toString() &&
      item.variantId.toString() === variantObjectId.toString()
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    const newItem: ILineItem = {
      productId: productObjectId,
      variantId: variantObjectId,
      quantity,
    };
    cart.items.push(newItem);
  }

  await cart.save();
  return cart;
};

export const updateCartItemService = async (
  token: string,
  itemId: string,
  quantity: number
) => {
  const cart = await Cart.findOne({ token });
  if (!cart) throw new Error("Cart not found");
  const item = (cart.items as any).id(itemId);
  if (!item) throw new Error("Item not found");

  item.quantity = quantity;
  await cart.save();

  return cart;
};

export const removeCartItemService = async (token: string, itemId: string) => {
  const cart = await Cart.findOne({ token });
  if (!cart) throw new Error("Cart not found");
  const itemExists = cart.items.id(itemId);
  if (!itemExists) throw new Error("Item not found in cart");
  cart.items.pull(itemId);
  await cart.save();
  return { token: cart.token, itemId };
};
