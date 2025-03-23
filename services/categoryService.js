import Category from "../models/categoriesModel.js";
import * as factory from "./factoryHandler.js";

// @desc Get list of category
// @route GET /api/v1/categories
// @access Public
export const getCategory = factory.getAll(Category);

// @desc Create category
// @route POST /api/v1/categories
// @access private
export const createCategory = factory.createOne(Category);

// @desc Get specific category by id
// @route GET /api/v1/categories/:id
// @access Public
export const getCategoryById = factory.getOne(Category);
