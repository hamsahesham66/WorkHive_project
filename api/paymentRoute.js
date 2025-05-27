import express from "express";
import { createCheckoutSession,confirmPayment } from "../services/paymentService.js";
import { protect } from "../services/authUserService.js";

const router = express.Router();

// Route to create a payment intent
router.post("/create-checkout-session/:serviceId", protect, createCheckoutSession);

router.post("/confirm-payment", protect, confirmPayment);


export default router;