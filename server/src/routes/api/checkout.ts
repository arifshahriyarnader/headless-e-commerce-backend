import { Router } from "express";
import { checkoutController } from "../../controllers";
import { validate } from "../../middleware";
import { createCheckoutValidation } from "../../validations/checkout.validation";

const router = Router();

router.post(
  "/",
  validate(createCheckoutValidation),
  checkoutController.createCheckoutController.createOrder
);

export default router;
