import { Schema, model, Document } from "mongoose";

export interface IPromo extends Document {
  code: string;
  type: "PERCENT" | "FIXED";
  value: number;
  startsAt: Date;
  endsAt: Date;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const PromoSchema = new Schema<IPromo>(
  {
    code: { type: String, required: true, uppercase: true, unique: true },
    type: { type: String, enum: ["PERCENT", "FIXED"], required: true },
    value: { type: Number, required: true, min: 0 },
    startsAt: { type: Date, required: true },
    endsAt: { type: Date, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model<IPromo>("Promo", PromoSchema);
