import express from "express";
import { getReviews,createReview,updateReview ,getUserReviews,getProviderReviews,deleteUserReview} from "../services/reviewService.js";
import *as authUserService from "../services/authUserService.js";
const router = express.Router();

// Route to get all reviews for home page
router.get("/", getReviews);
// Route to get reviews for a specific service provider
router.get("/provider/:providerId", getProviderReviews);
router.use(authUserService.protect)
// Route to create a new review
 router.post("/", createReview);
// Route to get a reviews for the logged-in user
router.get("/users", getUserReviews);
// Route to delete a review
router.delete("/:id", deleteUserReview);
// Route to update a review
router.patch("/:id",  updateReview);


export default router;