import { Schema, model, Document, Types } from "mongoose";

export interface ILineItem {
  _id?: Types.ObjectId;
  productId: Types.ObjectId;
  variantId: Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  token: string;
  items: Types.DocumentArray<ILineItem & Document>;
  promoCode?: string | null;
  status: "OPEN" | "CHECKED_OUT";
  createdAt: Date;
  updatedAt: Date;
}

const LineItemSchema = new Schema<ILineItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    variantId: { type: Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: true }
);

const CartSchema = new Schema<ICart>(
  {
    token: { type: String, required: true, unique: true },
    items: { type: [LineItemSchema], default: [] },
    promoCode: { type: String, default: null },
    status: { type: String, enum: ["OPEN", "CHECKED_OUT"], default: "OPEN" },
  },
  { timestamps: true }
);

export default model<ICart>("Cart", CartSchema);
