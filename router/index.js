import { adminRoutes } from "./adminRoutes.js";
import express from "express";
import { userRoutes } from "./userRoutes.js";
import { salesRoutes } from "./sellerRouter.js";
import { allProductRoutes } from "./allProduct.js";
import { cartlist } from "./cartRouter.js";


const router = express.Router();

router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/sales", salesRoutes);
router.use("/products", allProductRoutes);
router.use("/cart", cartlist);

export { router as apiRouter };


