import asyncHandler from "express-async-handler";
import Conversations from "../models/conversationsModel.js";
import Messages from "../models/messagesModel.js"; // Import the Messages model

// @desc Create a conversation for a user
// @route POST /api/v1/conversations
// @access Private
export const createConversation = asyncHandler(async (req, res) => {
  const customer_id = req.user.id;

  try {
    // Check if a conversation already exists for the user
    const existingConversation = await Conversations.findOne({
      where: { customer_id },
    });

    if (existingConversation) {
      // If a conversation exists, return a response
      return res.status(400).json({
        status: "fail",
        message: "A conversation already exists for this user.",
        data: existingConversation, // Optionally return the existing conversation
      });
    }

    // If no conversation exists, create a new one
    const newConversation = await Conversations.create({
      customer_id,
    });

    res.status(201).json({
      status: "success",
      message: "Conversation created successfully.",
      data: newConversation,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message:
        error.message || "An error occurred while creating the conversation.",
    });
  }
});

// @desc Post a message in a conversation
// @route POST /api/v1/messages
// @access Private
export const postMessage = asyncHandler(async (req, res) => {
  const { conversation_id, content, image_url } = req.body; // Extract message details from the request body
  const sender_id = req.user.id;
  const sender_type = req.user.role;

  try {
    // Check if the conversation exists
    const conversation = await Conversations.findByPk(conversation_id);
    if (!conversation) {
      return res.status(404).json({
        status: "fail",
        message: "Conversation not found.",
      });
    }

    // Create a new message
    const newMessage = await Messages.create({
      conversation_id,
      sender_type,
      sender_id,
      content,
      image_url,
    });

    res.status(201).json({
      status: "success",
      message: "Message posted successfully.",
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while posting the message.",
    });
  }
});

// @desc Get all messages for a conversation
// @route GET /api/v1/messages/:conversation_id
// @access Private (Admin or Customer)
export const getMessagesByConversation = asyncHandler(async (req, res) => {
  const { conversation_id } = req.params;

  try {
    // Check if the conversation exists
    const conversation = await Conversations.findByPk(conversation_id);
    if (!conversation) {
      return res.status(404).json({
        status: "fail",
        message: "Conversation not found.",
      });
    }

    // Fetch all messages for the conversation
    const messages = await Messages.findAll({
      where: { conversation_id },
      order: [["created_at", "ASC"]], // Sort messages by creation time
    });

    res.status(200).json({
      status: "success",
      results: messages.length,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while fetching messages.",
    });
  }
});
