import express from "express"
import { adminDeleteAccount, adminLogin, adminLogout, adminProfile, adminProfileUpdate, adminResetPassword, adminSignup, checkAdmin, getAllSellers, getAlluser, TerminateSeller, Terminateuser } from "../controllers/adminController.js"
import { adminAuth } from "../middleware/adminAuth.js"
import { productRoutes } from "./productRoutes.js"
import { upload } from "../middleware/multer.js"
import { advMobile } from "./adCarosal.js"
const router=express.Router()

router.post("/signup", adminSignup)
router.post("/login",adminLogin)


router.get('/profile',adminAuth,adminProfile)
router.put('/logout',adminAuth,adminLogout)


router.put('/reset-password',adminResetPassword)
router.put('/profile-update',adminAuth,upload.single("adminProfileImg"),adminProfileUpdate,)
router.delete('/delete-account',adminAuth,adminDeleteAccount)

router.put('/terminateAccount/:userId',adminAuth,Terminateuser)
router.get('/get-alluser',adminAuth,getAlluser)

router.get('/get-allSellers',adminAuth,getAllSellers)
router.put('/terminateSellerAccount/:sellerId',adminAuth,TerminateSeller)

router.get('/check-admin',adminAuth,checkAdmin)

router.use('/product',productRoutes)

router.use('/mobile_Carosal',advMobile)

export {router as adminRoutes}