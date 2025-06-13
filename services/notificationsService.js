import asyncHandler from "express-async-handler";
import WorkNotifications from "../models/workNotificationsModel.js"; // Import the WorkNotifications model

// @desc Get notifications for a specific user
// @route GET /api/v1/notifications/:customer_id
// @access Private
export const getNotificationsForUser = asyncHandler(async (req, res) => {
  const  customer_id = req.user.id;

  try {
    // Fetch notifications for the given customer_id
    const notifications = await WorkNotifications.findAll({
      where: { customer_id },
      order: [["created_at", "DESC"]], // Sort notifications by creation time (latest first)
    });

    res.status(200).json({
      status: "success",
      results: notifications.length,
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message:
        error.message || "An error occurred while fetching notifications.",
    });
  }
});

// @desc Update the status of a notification (accept or reject)
// @route PATCH /api/v1/notifications/:id
// @access Private
export const updateNotificationStatus = asyncHandler(async (req, res) => {
    // Ensure the user is authenticated and has access to the notification
    const customer_id = req.user.id; // Get the authenticated user's ID
  const { id } = req.params; // Extract notification ID from the request parameters
  const { status } = req.body; // Extract the new status from the request body
  const statusMapping = {
    approve: 2, // Integer value for "approve"
    reject: 1,  // Integer value for "reject"
  }
  try {
    // Validate the status value
    if (!statusMapping.hasOwnProperty(status)) {
        return res.status(400).json({
          status: "fail",
          message: "Invalid status value. Allowed values are 'approve' or 'reject'.",
        });
      }
    // Find the notification by ID
    const notification = await WorkNotifications.findOne({
        where: { id, customer_id }, // Ensure the notification belongs to the authenticated user
      });
    if (!notification) {
      return res.status(404).json({
        status: "fail",
        message: "Notification not found or does not belong to the authenticated user.",
      });
    }

    // Update the status of the notification
    notification.status = statusMapping[status]; 
    await notification.save();

    res.status(200).json({
      status: "success",
      message: `Notification status updated to '${status}' successfully.`,
      data: notification,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message:
        error.message ||
        "An error occurred while updating the notification status.",
    });
  }
});
