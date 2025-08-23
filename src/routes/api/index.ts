import {Router} from 'express';
import productRoutes from './product'
import cartRoutes from './cart'
import promoRoutes from './promo'

const router=Router()

router.use("/product", productRoutes)
router.use("/cart", cartRoutes)
router.use("/promo", promoRoutes)

export default router;