import { Router } from "express";
import { productController } from "../../controllers";

const router = Router();

router.post("/create-product", productController.createProductController);

router.get("/get-all-products", productController.getAllProductController);

export default router;
