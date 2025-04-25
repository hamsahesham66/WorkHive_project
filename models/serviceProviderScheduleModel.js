import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/dataBase.js";
import ServiceProvider from "./serviceProviderModel.js";
import Booking from "./bookingsModel.js";

const ServiceProviderSchedule = sequelize.define(
  "ServiceProviderSchedule",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    provider_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ServiceProvider, // Reference the ServiceProvider model
        key: "id",
      },
    },
    work_date: {
      type: DataTypes.DATEONLY, // Stores only the date (YYYY-MM-DD)
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME, // Stores only the time (HH:mm:ss)
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME, // Stores only the time (HH:mm:ss)
      allowNull: false,
    },
  },
  {
    tableName: "provider_schedule", // Table name in the database
    timestamps: false, // Disable Sequelize's automatic timestamps
  }
);

// Define association with ServiceProvider
ServiceProviderSchedule.belongsTo(ServiceProvider, {
  foreignKey: "provider_id",
  as: "serviceProvider",
});


export default ServiceProviderSchedule;