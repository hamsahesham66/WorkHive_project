import asyncHandler from "express-async-handler";
import Customer from "../models/customers.js";
import * as factory from "./factoryHandler.js";
import ApiError from "../utils/apiError.js";
import generateToken from "../utils/createToken.js";
import bcrypt from "bcryptjs";
// @desc Get all users
// @route GET /api/v1/auth/users
// @access public

export const getUsers = factory.getAll(Customer);

// @desc Update logged-in user data
// @route put /api/v1/auth/updateMe
// @access private
export const updateLoggedUserData = asyncHandler(async (req, res, next) => {
  const { fullname, email, phone } = req.body;

  // Update the user in the database
  const [updatedRowsCount] = await Customer.update(
    { fullname, email, phone },
    {
      where: { id: req.user.id }, // Use the logged-in user's ID
    }
  );

  // Check if the user was found and updated
  if (updatedRowsCount === 0) {
    return next(new ApiError(`No user found for this ID: ${req.user.id}`, 404));
  }

  // Fetch the updated user
  const updatedUser = await Customer.findOne({ where: { id: req.user.id } });

  // Send the updated user data in the response
  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});

// @desc update logged user password
// @route put /api/v1/auth/changeMyPassword
// @access private

export const updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { currentPassword, password, rePassword } = req.body;
  
    // 1️⃣ Check if all fields are provided
    if (!currentPassword || !password || !rePassword) {
      return next(new ApiError("Please provide all password fields", 400));
    }
  
    // 2️⃣ Validate new password and confirm password match
    if (password !== rePassword) {
      return next(new ApiError("Passwords do not match", 400));
    }
  
    // 3️⃣ Find the logged-in user
    const user = await Customer.findOne({ where: { id: userId } });
  
    if (!user) {
      return next(new ApiError("User not found", 404));
    }
  
    // 4️⃣ Check if the current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return next(new ApiError("Current password is incorrect", 400));
    }
  
    // 5️⃣ Hash the new password
    const hashedPassword = await bcrypt.hash(password, 12);
  
    // 6️⃣ Update password in the database
    await Customer.update(
      { password: hashedPassword},
      { where: { id: userId } }
    );
      // 7️⃣ Retrieve the updated user to get the latest data
    const updatedUser = await Customer.findOne({ where: { id: userId } });

    // 8️⃣ Generate a new JWT token with updated user data
    const token = generateToken(updatedUser);
    res.status(200).json({
      status: "success",
      message: "Password updated successfully",
      token,
    });
  });

