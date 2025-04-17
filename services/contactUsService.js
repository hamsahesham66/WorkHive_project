import ContactUs from "../models/contactUsModel.js";
import * as factory from "./factoryHandler.js";

// @desc create contact us
// @route POST /api/v1/contactUs
// @access Public
export const createContactUs = factory.createOne(ContactUs);