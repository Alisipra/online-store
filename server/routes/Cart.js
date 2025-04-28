import express from "express";
import { addToCart, clearCart, decreaseQty, getCart, removeProductFromCart } from "../controllers/cart.js";
import { authenticated } from "../middleware/auth.js";

const router=express.Router();

//get Cart of a user
router.get("/getcart",authenticated,getCart);
// add to cart
router.post("/add",authenticated,addToCart)
// remove product from cart
router.delete("/remove/:productId",authenticated,removeProductFromCart);
///clear cart
router.delete("/clearcart",authenticated,clearCart);
///decrease product qty
router.post("/--decrease",authenticated,decreaseQty);
export default router;