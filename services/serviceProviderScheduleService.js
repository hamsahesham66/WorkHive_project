import ServiceProviderSchedule from "../models/serviceProviderScheduleModel.js";
import Booking from "../models/bookingsModel.js";
import { sequelize } from "../config/dataBase.js";

export const getAvailableTimes = async (providerId) => {
  const query = `
    SELECT *
    FROM provider_schedule
    WHERE provider_id = ?
    AND NOT EXISTS (
      SELECT *
      FROM bookings
      WHERE provider_id = ?
        AND booking_date = provider_schedule.work_date
        AND booking_time = provider_schedule.start_time
    )
  `;

  try {
    // Using raw query to fetch available times
    const results = await sequelize.query(query, {
      replacements: [providerId, providerId], // Both placeholders get the same providerId
    });

    return results[0]; // Return only the rows
  } catch (error) {
    console.error("Error fetching available times:", error);
    throw new Error("Failed to fetch available times");
  }
};
