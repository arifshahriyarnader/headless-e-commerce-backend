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

export const getSalesReportService = async () => {
  return await Order.aggregate([
    { $match: { status: "DELIVERED" } },

    { $unwind: "$items" },

    {
      $group: {
        _id: {
          productId: "$items.productId",
          variantId: "$items.variantId",
        },
        totalSales: { $sum: "$items.quantity" },
      },
    },

    {
      $lookup: {
        from: "products",
        localField: "_id.productId",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$product" },

    {
      $addFields: {
        variant: {
          $arrayElemAt: [
            {
              $filter: {
                input: "$product.variants",
                as: "v",
                cond: { $eq: ["$$v._id", "$_id.variantId"] },
              },
            },
            0,
          ],
        },
      },
    },

    {
      $project: {
        _id: 0,
        productId: "$_id.productId",
        productTitle: "$product.title",
        variantId: "$_id.variantId",
        variantTitle: "$variant.title",
        totalSales: 1,
      },
    },
  ]);
};
