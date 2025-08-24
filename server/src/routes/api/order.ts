import { Router } from "express";
import { validate } from "../../middleware";
import { updatePaymentValidation } from "../../validations/order.validation";
import { orderController } from "../../controllers";


const router = Router();

router.patch(
  "/update-payment",
  validate(updatePaymentValidation),
  orderController.updatePaymentController
);

router.get("/sales-report", orderController.getSalesReportController);

export default router;
