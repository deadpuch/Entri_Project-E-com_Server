import express from "express"
import { userAuth } from "../middleware/userAuth.js"
import { addToCart, deleteItem, getAllItem } from "../controllers/cartController.js"
const router=express.Router()


router.post("/addItems/:productId",userAuth,addToCart)

router.get("/showItems",userAuth,getAllItem)

router.delete("/deleteItems/:productId",userAuth,deleteItem)


export {router as cartlist}