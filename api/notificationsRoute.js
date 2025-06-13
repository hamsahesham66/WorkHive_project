import express from "express";
import { getNotificationsForUser,updateNotificationStatus } from "../services/notificationsService.js";
import { protect } from "../services/authUserService.js";

const router = express.Router();
router.use(protect)

// Route to fetch notifications for a user
router.get("/", getNotificationsForUser);
router.patch("/:id", updateNotificationStatus);

export default router;