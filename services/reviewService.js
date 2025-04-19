import Review from "../models/reviewsModel.js";
import Customer from "../models/customers.js";
import asyncHandler from "express-async-handler";

// @desc Get all reviews with customer details
// @route GET /api/v1/reviews
// @access Public
export const getReviews = asyncHandler(async (req, res, next) => {
  const reviews = await Review.findAll({
    attributes: ["id", "rating", "comment", "created_at"], // Select specific fields from the reviews table
    include: [
      {
        model: Customer, // Join with the Customer model
        as: "customer", // Use the alias defined in the association
        attributes: ["id", "fullname"], // Include only the customer ID and name
      },
    ],
  });

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: reviews,
  });
});