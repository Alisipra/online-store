import express from "express";
import { createPaymentIntent } from "../controllers/stripeController.js"; // Fix import

const router = express.Router();

router.post("/create-payment-intent", createPaymentIntent);

export default router; // Use default export
