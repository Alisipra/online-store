import express from "express";
import { createOrder, getAllOrders, getUserOrders, updateOrder, updateOrderStatus } from "../controllers/order.js";

const router = express.Router();
router.post("/createorder", createOrder); 
router.get("/:userId", getUserOrders); // API to fetch user orders
router.get("/", getAllOrders); // API to fetch orders
router.put('/update-product/:orderId',updateOrder );
router.put("/status/:orderId", updateOrderStatus);


export default router;
