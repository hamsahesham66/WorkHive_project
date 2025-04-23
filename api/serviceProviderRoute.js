import express from "express";
import { getServiceProvidersByCategory } from "../services/serviceProviderService.js";

const router = express.Router({ mergeParams: true });

// Route to get service providers by category
router.get("/categories/:categoryId/service-providers", getServiceProvidersByCategory);

export default router;