import express from "express";
import { getAvailableTimes } from "../services/serviceProviderScheduleService.js";

const router = express.Router();

// Route to get available times for a specific service provider
router.get("/available_time/:providerId", async (req, res) => {
  try {
    const { providerId } = req.params; // Extract providerId from the route
    const availableTimes = await getAvailableTimes(providerId); // Call the service function
    res.status(200).json({
      status: "success",
      results: availableTimes.length,
      data: availableTimes,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
});

export default router;
