import { check } from "express-validator";
import validatorMiddleWare from "../../middleware/validatorMiddleWare.js";

export const createBookingValidator = [
  check("serviceId")
    .notEmpty()
    .withMessage("Service ID is required")
    .isInt()
    .withMessage("Service ID must be a valid integer"),
  check("providerId")
    .notEmpty()
    .withMessage("Provider ID is required")
    .isInt()
    .withMessage("Provider ID must be a valid integer"),
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a valid string"),
  check("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Phone number must be valid"),
  check("address").notEmpty().withMessage("Address is required"),
  check("region").notEmpty().withMessage("Region is required"),
  check("booking_date")
    .notEmpty()
    .withMessage("Booking date is required")
    .isISO8601()
    .withMessage("Booking date must be in ISO8601 format"),
  check("booking_time")
    .notEmpty()
    .withMessage("Booking time is required")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Booking time must be in HH:mm format"),
  validatorMiddleWare, // Middleware to handle validation errors
];
