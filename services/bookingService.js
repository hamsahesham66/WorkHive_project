import * as factory from './factoryHandler.js';
import Booking from '../models/bookingsModel.js';
import ServiceProviderSchedule from '../models/serviceProviderScheduleModel.js';
import ServiceProvider from '../models/serviceProviderModel.js';
import Service from '../models/servicesModel.js';
import Category from '../models/categoriesModel.js';
import Customer from '../models/customers.js';
import asyncHandler from 'express-async-handler';

// @desc create booking
// @route POST /api/v1/bookings
// @access Public
export const createBooking = factory.createOne(Booking);

// @desc get all bookings
// @route GET /api/v1/bookings
// @access Public
export const getUserBookings = asyncHandler(async (req, res) => {
    const { customerId } = req.params;
  
    const bookings = await Booking.findAll({
      where: { customerId },
      attributes: ["id", "booking_date", "booking_time","status"],
      include: [
        {
          model: Service,
          as: "service",
          attributes: ["id", "name"],
          include: [
            {
              model: Category,
              as: "category",
              attributes: ["name"],
            },
          ],
        },
        {
          model: ServiceProvider,
          as: "serviceProvider",
          attributes: ["id", "name"],
        },
      ],
    });
  
    res.status(200).json({
      status: "success",
      results: bookings.length,
      data: bookings,
    });
  });


  export const cancelBooking = asyncHandler(async (req, res) => {
    const { bookingId } = req.params; 
     const loggedInUserId = req.user.id; 
    const booking = await Booking.findByPk(bookingId);
  
    if (!booking) {
      return res.status(404).json({ status: "fail", message: "Booking not found" });
    }
    // Check if the logged-in user is the one who made the booking
    if (booking.customerId !== loggedInUserId) {
      return res.status(403).json({ status: "fail", message: "You are not authorized to cancel this booking" });
    }
  
    const now = new Date();
    const createdAt = new Date(booking.created_at); // time when booking was created
  
    const diffInMilliseconds = now.getTime() - createdAt.getTime();
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours
  
    if (diffInHours <= 2) {
      // Allow cancellation within 2 hours after booking creation
      booking.status = false;
      await booking.save();
  
      res.status(200).json({ status: "success", message: "Booking cancelled successfully" });
    } else {
      // Cannot cancel after 2 hours
      res.status(400).json({ status: "fail", message: "You can only cancel within 2 hours after booking." });
    }
  });