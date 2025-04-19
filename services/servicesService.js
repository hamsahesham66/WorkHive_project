import Service from "../models/servicesModel.js";
import ServiceProvider from "../models/serviceProviderModel.js";
import Category from "../models/categoriesModel.js";
import asyncHandler from "express-async-handler";

// @desc Get all services for a specific service provider in a specific category
// @route GET /api/v1/categories/:categoryId/service-providers/:serviceProviderId/services
// @access Public
export const getServicesByProviderAndCategory = asyncHandler(
  async (req, res, next) => {
    const { categoryId, providerId } = req.params; // Extract categoryId and serviceProviderId from URL parameters

    // Fetch services for the given service provider and category
    const services = await Service.findAll({
      where: {
       categoryId,
       providerId,
      },
      attributes: ["id", "name", "description", "price", "image","created_at"], // Select specific fields to return
      include: [
        {
          model: ServiceProvider, // Join with the ServiceProvider model
          as: "serviceProvider",
          attributes: ["id", "name"], // Include only the service provider ID and name
        },
        {
          model: Category, // Join with the Category model
          as: "category",
          attributes: ["id", "name"], // Include only the category ID and name
        },
      ],
    });

    res.status(200).json({
      status: "success",
      results: services.length,
      data: services,
    });
  }
);