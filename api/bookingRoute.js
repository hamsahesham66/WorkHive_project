import express from "express";
import *as authUserService from "../services/authUserService.js";
import { createBooking,getUserBookings,cancelBooking } from "../services/bookingService.js";

const router = express.Router(); 
router.use(authUserService.protect)
// Route to create a new booking
router.route("/").post(createBooking)
router.route("/").get(getUserBookings);
router.patch('/cancel/:bookingId',authUserService.protect, cancelBooking);
export default router;
