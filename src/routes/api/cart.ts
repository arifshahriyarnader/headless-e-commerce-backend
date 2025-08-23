import { Router } from "express";
import { validate } from "../../middleware";

import { cartController } from "../../controllers";
import {
  addItemValidation,
  createOrFetchCartValidation,
} from "../../validations/cart.validation";

const router = Router();

router.post(
  "/create-fetch",
  validate(createOrFetchCartValidation),
  cartController.createOrFetchCartController
);

router.post(
  "/:token/items",
  validate(addItemValidation),
  cartController.addCartItemController
);

export default router;
