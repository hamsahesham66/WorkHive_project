import * as authUserService from '../services/authUserService.js';
import * as authValidator from '../utils/validators/authValidator.js';
import express from "express";

const router = express.Router();

router.route("/signup").post( authValidator.signUpValidator,authUserService.signUp);
router.route("/login").post(authValidator.loginValidator, authUserService.login);
router.route("/forgotPassword").post(authUserService.forgotPassword);
router.route("/verifyResetCode").post(authUserService.verifyResetCode);
router.route("/users").get(authUserService.getAllUsers);

 export default router;