import { Router, Request, Response } from "express";
import {
  applyPromoValidation,
  createPromoValidation,
} from "../../validations/promo.validation";
import { validate } from "../../middleware";
import { promoController } from "../../controllers";

const router = Router();

router.post(
  "/create-promo",
  validate(createPromoValidation),
  promoController.createPromoController
);

router.post(
  "/:token/apply-promo",
  validate(applyPromoValidation),
  promoController.applyPromoToCartController
);

export default router;
