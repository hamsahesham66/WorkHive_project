import asyncHandler from "express-async-handler";
import Customer from "../models/customers.js";
import PasswordReset from "../models/passwordResetModel.js";
import bcrypt from "bcryptjs";
import moment from "moment-timezone";
import ApiError from "../utils/apiError.js";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";
import { Sequelize } from "sequelize";
import generateToken from "../utils/createToken.js";
import jwt from "jsonwebtoken";
// @desc Sign up user
// @route POST /api/v1/auth/signup
// @access public
export const signUp = asyncHandler(async (req, res) => {
  // TODO: Implement signup logic CREATE USER,SEND RESPONSE
  const {
    fullname,
    email,
    password,
    phone,
    address,
    city,
    country,
    gender,
    role,
  } = req.body;
  if (!fullname || !email || !password || !gender) {
    return res
      .status(400)
      .json({ status: "fail", message: "Please provide all required fields" });
  }
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await Customer.create({
    fullname,
    email,
    password: hashedPassword,
    phone,
    address,
    city,
    country,
    gender,
    role,
  });
  const userData = user.toJSON();
  userData.createdAt = moment
    .tz(user.createdAt, "Africa/Cairo")
    .format("YYYY-MM-DD HH:mm:ss");
  userData.updatedAt = moment
    .tz(user.updatedAt, "Africa/Cairo")
    .format("YYYY-MM-DD HH:mm:ss");

  res.status(201).json({ status: "success", data: { user: userData } });
});

// @desc Login user
// @route POST /api/v1/auth/login
// @access public
export const login = asyncHandler(async (req, res, next) => {
  // TODO: Implement login logic LOGIN USER, SEND RESPONSE
  const { email, password } = req.body;
  const user = await Customer.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new ApiError("Invalid email or password", 401));
  }
  const token = generateToken(user);

  res
    .status(200)
    .json({ status: "success", message: "User logged in successfully", token });
});

// @desc Forgot password
// @route POST /api/v1/auth/forgotpassword
// @access public

export const forgotPassword = asyncHandler(async (req, res, next) => {
  // 1️⃣ Get user by email
  const user = await Customer.findOne({ where: { email: req.body.email } });
  if (!user) {
    return next(
      new ApiError(`No account with this email found ${req.body.email}`, 404)
    );
  }

  // 2️⃣ Generate a random 6-digit OTP
  const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedCode = crypto
    .createHash("sha256")
    .update(randomCode)
    .digest("hex");

  // 3️⃣ Store OTP in the database (`password_resets` table)
  await PasswordReset.create({
    email: user.email,
    otp_code: hashedCode,
    expires_at: new Date(Date.now() + 10 * 60 * 1000), // OTP valid for 10 minutes
  });

  // 4️⃣ Send email with OTP code
  const message = `Hi ${user.fullname},\n\nWe received a request to reset your password.\n\nYour password reset code (valid for 10 minutes):\n\n${randomCode}`;

  await sendEmail({
    email: user.email,
    subject: "Password Reset Code",
    message,
  });

  // 5️⃣ Send success response
  res.status(200).json({
    status: "success",
    message: "We sent a password reset code to your email.",
  });
});

// @desc Verify reset code
// @route POST /api/v1/auth/verifyResetCode
// @access public
export const verifyResetCode = asyncHandler(async (req, res, next) => {
  const hashedCode = crypto
    .createHash("sha256")
    .update(req.body.resetCode)
    .digest("hex");

  const resetRecord = await PasswordReset.findOne({
    where: {
      otp_code: hashedCode,
      expires_at: { [Sequelize.Op.gt]: new Date() },
    },
  });

  if (!resetRecord) {
    return next(new ApiError("Invalid or expired reset code", 400));
  }
  // 4️��� Update the reset record to mark it as verified
  await resetRecord.update({ is_verified: true });

  res.status(200).json({
    status: "success",
    message: "Code verified successfully",
  });
});

// @desc Reset password
// @route POST /api/v1/auth/resetpassword 
// @access public
export const resetPassword = asyncHandler(async (req, res, next) => {
  // 1️⃣ Get user by email
  const resetRecord = await PasswordReset.findOne({
    where: {
      email: req.body.email,
      is_verified: true, // ✅ Ensure OTP was verified
    },
  });

  if (!resetRecord) {
    return next(new ApiError("OTP not verified or expired", 400));
  }

  const user = await Customer.findOne({ where: { email: req.body.email } });
  if (!user) {
    return next(
      new ApiError(`No account with this email found: ${req.body.email}`, 404)
    );
  }
  // 3️⃣ Update the user's password
  const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);
  user.password = hashedPassword;
  await user.save();

  // 4️⃣ Delete the reset record from the database
  await PasswordReset.destroy({ where: { email: user.email } });

  // 5️⃣ Generate a new token
  const token = generateToken(user);

  // 6️⃣ Send success response
  res.status(200).json({
    status: "success",
    token: token,
    message: "Password reset successfully",
  });
});

  // @desc Protect routes and routes for authenticated users(make sure user is logged in)
  // @access private
  export const protect = asyncHandler(async (req, res, next) => {
    // TODO: Implement protecting routes using JWT (JSON Web Tokens)
    // 1- get token and check if it exists
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      
    }
    if (!token) {
      return next(new ApiError(
          "You are not authorized to access this route, please login to access this route",
          401));
        }
    // 2- i want to verify that the token is valid
    //const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

 const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const currentUser = await Customer.findOne({ where: { id: decoded.id } });
     if (!currentUser) {
       return next(new ApiError("User no longer exists", 401));
    }
    //4- check if user changed password after token was issued
    if (decoded.passwordHash !== currentUser.password) {
    return next(new ApiError("User changed password! Please login again", 401));
  }              /// don't forget to implement this
    req.user = currentUser;
    next();
  });