import express from "express";
import { getReviews,createReview,updateReview } from "../services/reviewService.js";
import *as authUserService from "../services/authUserService.js";
const router = express.Router();

// Route to get all reviews
router.get("/", getReviews);
// Route to create a new review
 router.post("/", authUserService.protect, createReview);
// Route to update a review
router.patch("/:id", authUserService.protect, updateReview);

export default router;