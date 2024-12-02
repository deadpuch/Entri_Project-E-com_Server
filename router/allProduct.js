import express from "express";
import { allItem, latestItem, SingleItem } from "../controllers/allItem.js";


const router = express.Router();


router.get("/get-allProduct", allItem);
router.get("/latestproducts", latestItem);
router.get("/product-details/:productId", SingleItem);






export { router as allProductRoutes };
