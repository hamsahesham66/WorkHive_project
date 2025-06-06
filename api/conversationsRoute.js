import express from "express";
import { createConversation } from "../services/chatService.js";
import *as authUserService from "../services/authUserService.js";

const router = express.Router();
router.use(authUserService.protect)

// Route to create a conversation
router.post("/", createConversation);

export default router;