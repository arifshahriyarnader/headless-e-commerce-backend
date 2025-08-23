import { Router } from "express";
import { validate } from "../../middleware";
import { cartController } from "../../controllers";
import {
  addItemValidation,
  createOrFetchCartValidation,
  updateItemValidation,
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

router.put(
  "/:token/items/:itemId",
  validate(updateItemValidation),
  cartController.updateCartItemController
);

export default router;
