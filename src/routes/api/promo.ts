import { Router, Request, Response } from "express";
import { createPromoValidation } from "../../validations/promo.validation";
import { validate } from "../../middleware";
import { promoController } from "../../controllers";

const router = Router();

router.post(
  "/create-promo",
  validate(createPromoValidation),
  promoController.createPromoController
);

export default router;
