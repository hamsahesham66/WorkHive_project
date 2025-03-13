import { check } from "express-validator";
import validatorMiddleWare from "../../middleware/validatorMiddleWare.js";
import slugify from "slugify";
import Customer from "../../models/customers.js";

export const signUpValidator = [
  check("fullname")
    .notEmpty()
    .withMessage("full name is required")
    .isLength({ min: 3 })
    .withMessage("Too short user name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("email required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (val) => {
      const user = await Customer.findOne({ where: { email: val } });
      if (user) {
        return Promise.reject(new Error("Email already in use"));
      }
    }),
  check("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 6 })
    .withMessage("Too short password")
    .custom((pass, { req }) => {
      if (pass !== req.body.confirmPassword) {
        throw new Error("password confirmation do not match");
      }
      return true;
    }),
  check("confirmPassword").notEmpty().withMessage("confirm password required"),
  check("phone")
  .notEmpty()
  .withMessage("phone number required")
  .isMobilePhone(["ar-EG"])
  .withMessage(
    "Invalid phone number format only accepted for Egypt"
  ),
  check("gender")
  .notEmpty()
  .withMessage("gender is required")
  .isIn(['male', 'female', 'other'])
  .withMessage("Invalid gender value"),
  check("address").optional(),
    check("city").optional(),
    check("country").optional(),

  validatorMiddleWare,
];

export const loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("email required")
    .isEmail()
    .withMessage("Invalid email format"),
  check("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 6 })
    .withMessage("Too short password"),
  validatorMiddleWare,
];