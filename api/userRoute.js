import * as userService from "../services/userService.js";
import express from "express";
const router = express.Router();

router.route("/").get(userService.getUsers);