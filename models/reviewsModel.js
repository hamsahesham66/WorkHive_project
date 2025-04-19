import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/dataBase.js";
import Customer from "./customers.js"; // Import the Customer model

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
    },
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
    },
  },
  {
    tableName: "reviews",
    timestamps: false, // Disable Sequelize's automatic timestamps
  }
);

// Define the association
Review.belongsTo(Customer, {
  foreignKey: "customerId", // Foreign key in the reviews table
  as: "customer", // Alias for the association
});

export default Review;