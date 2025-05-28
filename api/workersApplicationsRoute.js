import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { createWorkerApplication } from "../services/workersApplicationsService.js";

const router = express.Router();

// Route to create a worker application
router.post("/", upload.fields([
  { name: "photo", maxCount: 1 },
  { name: "front_id", maxCount: 1 },
  { name: "back_id", maxCount: 1 },
]), createWorkerApplication);

export default router;