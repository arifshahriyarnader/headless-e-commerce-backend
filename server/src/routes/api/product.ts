import { Router } from "express";
import { productController } from "../../controllers";

const router = Router();

router.post("/create-product", productController.createProductController);
router.get("/get-all-products", productController.getAllProductController);
router.get("/:id", productController.getProductByIdController);
router.put("/:id", productController.updateProductController);
router.delete("/:id", productController.deleteProductController);

export default router;
