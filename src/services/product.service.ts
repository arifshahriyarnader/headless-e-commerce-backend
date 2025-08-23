import { Types } from "mongoose";
import Product, { IProduct } from "../models/product.model";
import { ProductInput } from "../validations/product.validation";

export const createProductService = async (
  data: ProductInput
): Promise<IProduct> => {
  const product = new Product(data);
  return await product.save();
};

export const getAllProductsService = async (): Promise<IProduct[]> => {
  return await Product.find();
};

export const getProductByIdService = async (
  id: string
): Promise<IProduct | null> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid product ID");
  }
  return await Product.findById(id);
};

export const updateProductService = async (
  id: string,
  updateData: Partial<IProduct>
): Promise<IProduct | null> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Product Id");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  );
  return updatedProduct;
};
