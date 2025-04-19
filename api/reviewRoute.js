import express from "express";
import { getReviews } from "../services/reviewService.js";

const router = express.Router();

// Route to get all reviews
router.get("/", getReviews);

export default router;