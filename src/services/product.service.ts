import Product, { IProduct } from "../models/product.model";
import { ProductInput } from "../validations/product.validation";

export const createProductService = async (
  data: ProductInput
): Promise<IProduct> => {
  const product = new Product(data);
  return await product.save();
};
