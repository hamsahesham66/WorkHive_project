import * as userService from "../services/userService.js";
import *as authUserService from "../services/authUserService.js";
import express from "express";
const router = express.Router();

router.route("/").get(userService.getUsers);

router.use(authUserService.protect)

router.put('/updateMe', userService.updateLoggedUserData);
router.put('/changeMyPassword', userService.updateLoggedUserPassword);
router.get('/getMe',userService.getLoggedUserData,userService.getUserById);

export default router;