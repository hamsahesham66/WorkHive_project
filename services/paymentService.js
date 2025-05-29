import stripe from "../config/stripeConfig.js";
import asyncHandler from "express-async-handler";
import Service from "../models/servicesModel.js"; // Import your Service model
import Booking from "../models/bookingsModel.js"; // Import your Booking model
// @desc Create a Checkout Session
// @route POST /api/v1/payments/create-checkout-session/:serviceId
// @access Private
export const createCheckoutSession = asyncHandler(async (req, res) => {
  const { serviceId } = req.params; // Extract service ID from the route
  const { successUrl, cancelUrl } = req.query; // Success and cancel URLs
  const {
    
    providerId,
    name,
    phone,
    address,
    region,
    booking_date,
    booking_time,
    paymentMethod,
  } = req.body;
  const customerId = req.user.id; // Extract customer ID from the token

  // Fetch service details dynamically
  const service = await Service.findByPk(serviceId);

  if (!service) {
    return res
      .status(404).json({ status: "fail", message: "Service not found" });
  }

  const { name:serviceName, price } = service; // Assume the service model has `name` and `price` fields

  try {
    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Accept card payments
      mode: "payment", // One-time payment
      line_items: [
        {
          price_data: {
            currency: "egp", // Currency in EGP
            product_data: {
              name:serviceName, // Dynamically set the name of the service
            },
            unit_amount: Math.round(price * 100), // Dynamically set the amount (convert to piasters)
          },
          quantity: 1,
        },
      ],
      metadata: { customerId, serviceId ,providerId,name ,phone, address ,region,booking_date,booking_time,paymentMethod: "visa"}, // Pass customer and service IDs as metadata
      success_url: successUrl, // Redirect URL on success
      cancel_url: cancelUrl, // Redirect URL on cancel
    });

    res.status(200).json({
      status: "success",
      sessionId: session.id, // Send session ID to the frontend
      url: session.url, // Send the hosted checkout page URL to the frontend
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// @desc Confirm Payment
// @route POST /api/v1/payments/confirm-payment
// @access Private
export const confirmPayment = asyncHandler(async (req, res) => {
  const { sessionId } = req.body; // Extract session ID from the request body

  try {
    // Retrieve the Checkout Session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const { customerId, serviceId,providerId,name, phone, address ,region,booking_date,booking_time,paymentMethod } = session.metadata;

      // Perform actions based on the payment success
      console.log(
        `Payment succeeded for customer ID: ${customerId}, service ID: ${serviceId}`
      );

      // Example: Create a booking in the database
      const booking = await Booking.create({
        customerId,
        serviceId,
        providerId,
        name,
        phone,
        address,
        region,
        booking_date,
        booking_time,
        paymentMethod,
        status: true,
      });


      return res
        .status(200)
        .json({
          status: "success",
          message: "Payment confirmed and booking created",
          data: booking, 
        });
    } else {
      return res
        .status(400)
        .json({ status: "fail", message: "Payment not completed" });
    }
  } catch (error) {
    console.error(`Error confirming payment: ${error.message}`);
    res.status(500).json({ status: "error", message: error.message });
  }
});
