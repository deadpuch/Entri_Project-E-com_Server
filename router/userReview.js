import express from "express";
import { userAuth } from "../middleware/userAuth.js";
import { allReview, createReview, deleteReview} from "../controllers/reviewController.js";

const router=express.Router();

// router.put("/edit_review/:id",userAuth,editReview)

router.post("/create_review/:productId",userAuth,createReview)

router.get("/allreview",userAuth,allReview)

router.delete("/delete_review/:reviewId",userAuth,deleteReview)




export{router as userReview }