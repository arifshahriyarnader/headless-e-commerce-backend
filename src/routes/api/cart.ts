import { Router, Request, Response } from "express";
import { validate } from "../../middleware";

import { cartController } from "../../controllers";
import { createOrFetchCartValidation } from "../../validations/cart.validation";

const router = Router();

router.post(
  "/create-fetch",
  validate(createOrFetchCartValidation),
  cartController.createOrFetchCartController
);

export default router;
