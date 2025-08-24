import { Request, Response } from "express";
import { orderServices } from "../services";

export const updatePaymentController = async (req: Request, res: Response) => {
  try {
    const { orderId, paymentStatus } = req.body;

    if (!orderId || !paymentStatus) {
      return res
        .status(400)
        .json({ message: "orderId and paymentStatus are required" });
    }

    if (!["PAID", "FAILED"].includes(paymentStatus)) {
      return res.status(400).json({ message: "Invalid payment status" });
    }

    const order = await orderServices.updatePaymentService(
      orderId,
      paymentStatus
    );

    res.status(200).json({
      message: "Order updated successfully",
      order,
    });
  } catch (err: any) {
    if (err.message === "Order not found") {
      return res.status(404).json({ message: err.message });
    }

    res.status(500).json({
      message: "Failed to update order",
      error: err.message,
    });
  }
};
