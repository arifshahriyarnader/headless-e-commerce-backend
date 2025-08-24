import { Schema, model, Document, Types } from "mongoose";

export interface IOrderLine {
  productId: Types.ObjectId;
  variantId: Types.ObjectId;
  sku?: string;
  title?: string;
  unitPrice: number;
  quantity: number;
}

export interface IOrder extends Document {
  cartId: Types.ObjectId;
  items: IOrderLine[];
  subtotal: number;
  discount: number;
  total: number;
  promoCode?: string;
  status: "PLACED" | "CANCELLED" | "DELIVERED";
  paymentStatus?: "PENDING" | "PAID" | "FAILED";
  createdAt?: Date;
  updatedAt?: Date;
}

const OrderLineSchema = new Schema<IOrderLine>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    variantId: { type: Schema.Types.ObjectId, required: true },
    sku: String,
    title: String,
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    cartId: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
    items: { type: [OrderLineSchema], required: true },
    subtotal: { type: Number, required: true },
    discount: { type: Number, required: true },
    total: { type: Number, required: true },
    promoCode: String,
    status: { type: String, enum: ["PLACED", "CANCELLED", "DELIVERED"], default: "PLACED" },
    paymentStatus:{type: String, enum: ["PENDING", "PAID", "FAILED"], default: "PENDING"}
  },
  { timestamps: true }
);

export default model<IOrder>("Order", OrderSchema);
