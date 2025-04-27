import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/dataBase.js";
import ServiceProviderSchedule from "./serviceProviderScheduleModel.js";

import Customer from "./customers.js";
import ServiceProvider from "./serviceProviderModel.js";
import Service from "./servicesModel.js";

const Booking = sequelize.define(
  "Booking",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer, // Reference the Customer model
        key: "id",
      },
    },
    providerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ServiceProvider, // Reference the ServiceProvider model
        key: "id",
      },
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Service, // Reference the Service model
        key: "id",
      },
    },
   
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
        type: DataTypes.BOOLEAN, 
        allowNull: false,
        defaultValue: true, // Default to 0 (false)
      },
    booking_date: {
      type: DataTypes.DATEONLY, // Stores only the date (YYYY-MM-DD)
      allowNull: false,
    },
    booking_time: {
      type: DataTypes.TIME, // Stores only the time (HH:mm:ss)
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    tableName: "bookings", // Table name in the database
    timestamps: false, // Disable Sequelize's automatic timestamps
  }
);

// Define associations
Booking.belongsTo(Customer, {
  foreignKey: "customerId",
  as: "customer",
});

Booking.belongsTo(ServiceProvider, {
  foreignKey: "providerId",
  as: "serviceProvider",
});

Booking.belongsTo(Service, {
  foreignKey: "serviceId",
  as: "service",
});

export default Booking;