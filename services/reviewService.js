import Review from "../models/reviewsModel.js";
import Customer from "../models/customers.js";
import asyncHandler from "express-async-handler";

// @desc Get all reviews with customer details to put on home page
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

// @desc Get reviews for the logged-in user
// @route GET /api/v1/reviews/user
// @access private
export const getUserReviews = asyncHandler(async (req, res, next) => {
  const customerId = req.user.id; // Extract customer ID from the token

  // Fetch reviews for the logged-in user
  const reviews = await Review.findAll({
    where: { customerId }, // Filter reviews by the logged-in user's ID
    attributes: ["id", "rating", "comment", "created_at"], // Select specific fields from the reviews table
  });

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: reviews,
  });
});

// @desc Create a new review
// @route POST /api/v1/reviews
// @access private
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
// @access private
export const updateReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  // Find the review by ID
  const review = await Review.findByPk(id);

  if (!review) {
    return res
      .status(404)
      .json({ status: "fail", message: "Review not found" });
  }

  // Update the review
  await review.update({ rating, comment });

  res.status(200).json({
    status: "success",
    data: review, // Return the updated review
  });
});

// @desc Get reviews for a specific service provider
// @route GET /api/v1/reviews/provider/:providerId
// @access Public
export const getProviderReviews = asyncHandler(async (req, res, next) => {
  const { providerId } = req.params; // Extract provider ID from the route

  // Fetch reviews for the specified service provider
  const reviews = await Review.findAll({
    where: { providerId }, // Filter reviews by the provider ID
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

// @desc Delete a review
// @route DELETE /api/v1/reviews/:id
// @access Private
export const deleteUserReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params; // Extract review ID from the route
  const customerId = req.user.id; // Extract customer ID from the token

  // Find the review by ID and ensure it belongs to the logged-in user
  const review = await Review.findOne({
    where: {
      id,
      customerId, // Ensure the review belongs to the logged-in user
    },
  });

  if (!review) {
    return res.status(404).json({
      status: "fail",
      message:
        "Review not found or you are not authorized to delete this review",
    });
  }

  // Delete the review
  await review.destroy();

  res.status(200).json({
    status: "success",
    message: "Review deleted successfully",
  });
});
