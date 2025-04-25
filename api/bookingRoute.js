import express from "express";
import { createBooking } from "../services/bookingService.js";

const router = express.Router(); 
// Route to create a new booking
router.post("/", createBooking);

export default router;
