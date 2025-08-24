import { Order } from "../models";

export const updatePaymentService = async (
  orderId: string,
  paymentStatus: "PAID" | "FAILED"
) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  order.paymentStatus = paymentStatus;

  if (paymentStatus === "PAID") {
    order.status = "DELIVERED";
  } else if (paymentStatus === "FAILED") {
    order.status = "CANCELLED";
  }

  await order.save();

  return order;
};
