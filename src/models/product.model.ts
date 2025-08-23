import { Schema, model, Document, Types } from "mongoose";

export interface IVariant {
  _id?: Types.ObjectId;
  sku: string;
  title: string;
  price: number;
  attributes?: Record<string, string>;
}

export interface IProduct extends Document {
  title: string;
  description?: string;
  variants: IVariant[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const VariantSchema = new Schema<IVariant>(
  {
    sku: { type: String, required: true, index: true },
    title: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    attributes: { type: Map, of: String },
  },
  { _id: true }
);

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: { type: String },
    variants: { type: [VariantSchema], default: [] },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model<IProduct>("Product", ProductSchema);
