import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";
import {
  addProduct,
  deleteAllProduct,
  deleteProduct,
  editProduct,
  getProduct,
  getProductDetails,
} from "../controllers/productController.js";

import { upload } from "../middleware/multer.js";

const fileUpload = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "itemImage", maxCount: 5 },
]);

const router = express.Router();

router.post("/addproduct", fileUpload,adminAuth,addProduct);

router.get("/get-product", adminAuth, getProduct);
router.get("/get-productDetails/:productId",adminAuth,getProductDetails);

router.put("/product-update/:productId",fileUpload, adminAuth, editProduct);

router.delete("/product-deleteAll", adminAuth, deleteAllProduct);
router.delete("/product-delete/:productId", adminAuth, deleteProduct);

// router.post("/selleraddproduct", saleAuth, sellerAddProduct);

export { router as productRoutes };
