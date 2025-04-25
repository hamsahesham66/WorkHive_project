import * as factory from './factoryHandler.js';
import Booking from '../models/bookingsModel.js';
import ServiceProviderSchedule from '../models/serviceProviderScheduleModel.js';
import ServiceProvider from '../models/serviceProviderModel.js';
import Service from '../models/servicesModel.js';
import Customer from '../models/customers.js';

// @desc create booking
// @route POST /api/v1/bookings
// @access Public
export const createBooking = factory.createOne(Booking);
