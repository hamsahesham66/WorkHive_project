import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/dataBase.js";
import Customer from "./customers.js"; // Import the Customer model
import ServiceProvider from "./serviceProviderModel.js"; // Import the ServiceProvider model
import Booking from "./bookingsModel.js"; // Import the Booking model

const Review = sequelize.define(
  "Review",
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
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Booking, // Reference the Booking model
        key: "id",
      },
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1), // Decimal with 2 digits and 1 decimal place
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Use Sequelize's NOW for default value
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Use Sequelize's NOW for default value
    },
  },
  {
    tableName: "reviews",
    timestamps: false, // Disable Sequelize's automatic timestamps
    hooks: {
      beforeUpdate: (review) => {
        review.updated_at = new Date(); // Manually update the updated_at field
      },
    },
  }
);

// Define associations

// Link Review to Customer
Review.belongsTo(Customer, {
  foreignKey: "customerId", // Foreign key in the reviews table
  as: "customer", // Alias for the association
});

// Link Review to ServiceProvider
Review.belongsTo(ServiceProvider, {
  foreignKey: "providerId", // Foreign key in the reviews table
  as: "serviceProvider", // Alias for the association
});

// Link Review to Booking
Review.belongsTo(Booking, {
  foreignKey: "bookingId", // Foreign key in the reviews table
  as: "booking", // Alias for the association
});

export default Review;
