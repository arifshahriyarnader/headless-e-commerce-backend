import {Router} from 'express';
import productRoutes from './product'
import cartRoutes from './cart'
import promoRoutes from './promo'
import checkoutRoutes from './checkout'

const router=Router()

router.use("/product", productRoutes)
router.use("/cart", cartRoutes)
router.use("/promo", promoRoutes)
router.use("/checkout", checkoutRoutes)

export default router;