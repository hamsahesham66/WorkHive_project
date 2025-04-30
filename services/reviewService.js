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
// @desc Create a new review
// @route POST /api/v1/reviews
// @access Public
export const createReview = asyncHandler(async (req, res, next) => {
  const { providerId, bookingId, rating, comment } = req.body;
  const customerId = req.user.id;

  // Create a new review
  const review = await Review.create({
    customerId,
    providerId,
    bookingId,
    rating,
    comment,
  });

  res.status(201).json({
    status: "success",
    data: review,
  });
});
// @desc Update a review
// @route PATCH /api/v1/reviews/:id
// @access Public
export const updateReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  // Find the review by ID
  const review = await Review.findByPk(id);

  if (!review) {
    return res.status(404).json({ status: "fail", message: "Review not found" });
  }

  // Update the review

  await review.update({ rating, comment });

  res.status(200).json({
    status: "success",
    data: review, // Return the updated review
  });
});

