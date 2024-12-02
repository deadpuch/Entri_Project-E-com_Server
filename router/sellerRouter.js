import express from "express";
import { checkSaleUser, salesDeleteAccount, salesLogin, salesLogout, salesProfile, salesProfileUpdate, salesResetPassword, salesSignup } from "../controllers/sellerController.js";
import { sellerAuth } from "../middleware/sellerAuth.js";
import {upload} from "../middleware/multer.js"
import { sellerProduct} from "./sellerProduct.js";


const router=express.Router();

router.post("/signup",salesSignup)
router.post("/login",salesLogin)


router.get('/profile',sellerAuth,salesProfile)
router.put('/profile-update',sellerAuth,upload.single("sellerProPic"),salesProfileUpdate)


router.put('/logout',sellerAuth,salesLogout)
router.put('/reset-password',sellerAuth,salesResetPassword)
router.delete('/delete-account',sellerAuth,salesDeleteAccount)

router.get('/checkSales-user',sellerAuth,checkSaleUser)



router.use("/seller-Product",sellerProduct)


export{router as salesRoutes}