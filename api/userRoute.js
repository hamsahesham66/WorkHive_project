import * as userService from "../services/userService.js";
import *as authUserService from "../services/authUserService.js";
import express from "express";
const router = express.Router();

router.route("/").get(userService.getUsers);

router.put('/updateMe',authUserService.protect, userService.updateLoggedUserData);
router.put('/changeMyPassword',authUserService.protect, userService.updateLoggedUserPassword);

export default router;