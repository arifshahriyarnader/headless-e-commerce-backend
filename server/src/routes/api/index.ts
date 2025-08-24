import {Router} from 'express';
import productRoutes from './product'
import cartRoutes from './cart'
import promoRoutes from './promo'
import checkoutRoutes from './checkout'
import orderRoutes from './order'

const router=Router()

router.use("/product", productRoutes)
router.use("/cart", cartRoutes)
router.use("/promo", promoRoutes)
router.use("/checkout", checkoutRoutes)
router.use("/order", orderRoutes)

export default router;