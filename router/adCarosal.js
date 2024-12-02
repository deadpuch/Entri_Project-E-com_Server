import { adminAuth } from "../middleware/adminAuth.js";
import express from "express"
import { upload } from "../middleware/multer.js";
import { addAdvImage } from "../controllers/adminController.js";

const router = express.Router();

router.post("/addImg", adminAuth,upload.array('advImages',5),addAdvImage)


export {router as advMobile}