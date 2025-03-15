import asyncHandler from "express-async-handler";
import Customer from "../models/customers.js";
// @desc Get all users
// @route GET /api/v1/auth/users
// @access public

export const getUsers = factory.getAll(Customer);
