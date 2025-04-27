import express from "express";
import { getServiceProvidersByCategory,getServiceProviderById } from "../services/serviceProviderService.js";

const router = express.Router({ mergeParams: true });

// Route to get service providers by category
router.get("/categories/:categoryId/service-providers", getServiceProvidersByCategory);
router.get("/categories/:categoryId/service-providers/:providerId", getServiceProviderById);

export default router;