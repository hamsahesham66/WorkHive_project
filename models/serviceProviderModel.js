import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/dataBase.js";
import Category from "./categoriesModel.js";

const ServiceProvider = sequelize.define(
  "ServiceProvider",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Ensure the email is valid
      },
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "other"), // Enum for gender
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category, // Reference the Category model
        key: "id",
      },
    },
    experience_years: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT, 
      allowNull: true,
      defaultValue: 0, 
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
    tableName: "serviceproviders",
    timestamps: false, 
  }
);

ServiceProvider.belongsTo(Category, {
    foreignKey: "categoryId", // Foreign key in the ServiceProvider table
    as: "category", // Alias for the association
  });
export default ServiceProvider;
