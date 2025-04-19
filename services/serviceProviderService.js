import ServiceProvider from "../models/serviceProviderModel.js";
import Category from "../models/categoriesModel.js";
import asyncHandler from "express-async-handler";

// @desc Get all service providers for a specific category
// @route GET /api/v1/categories/:categoryId/service-providers
// @access Public
export const getServiceProvidersByCategory = asyncHandler(
  async (req, res, next) => {
    const { categoryId } = req.params; // Extract categoryId from URL parameters

    // Fetch service providers for the given category ID, including category details
    const serviceProviders = await ServiceProvider.findAll({
      where: { categoryId },
      attributes: [
        "id",
        "name",
        "email",
        "gender",
        "phone",
        "bio",
        "profile_picture",
        "address",
        "city",
        "country",
        "postal_code",
        "experience_years",
        "rating",
      ], // Select specific fields to return
      include: [
        {
          model: Category, // Join with the Category model
            as: "category", // Alias for the category association
          attributes: ["id", "name"], // Include only the category ID and name
        },
      ],
    });

    res.status(200).json({
      status: "success",
      results: serviceProviders.length,
      data: serviceProviders,
    });
  }
);
