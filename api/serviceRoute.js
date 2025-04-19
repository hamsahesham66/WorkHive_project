import express from "express";
import { getServicesByProviderAndCategory } from "../services/servicesService.js";

const router = express.Router({ mergeParams: true }); // Enable access to parent route params

// Route to get all services for a specific service provider in a specific category
router.get(
  "/categories/:categoryId/service-providers/:providerId/services",
  getServicesByProviderAndCategory
);

export default router;