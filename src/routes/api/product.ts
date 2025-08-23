import { Router } from "express";
import { createProductController } from "../../controllers/product.controller";

const router = Router();

router.post("/create-product", createProductController);

export default router;
