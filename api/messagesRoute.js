import express from "express";
import { postMessage,getMessagesByConversation } from "../services/chatService.js";
import *as authUserService from "../services/authUserService.js";

const router = express.Router();
router.use(authUserService.protect)

// Route to post a message
router.post("/", postMessage);

router.get("/:conversation_id", getMessagesByConversation);

export default router;