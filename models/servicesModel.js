import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/dataBase.js";
import ServiceProvider from "./serviceProviderModel.js";
import Category from "./categoriesModel.js";

const Service = sequelize.define(
  "Service",
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    providerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ServiceProvider, // Reference the ServiceProvider model
        key: "id",
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category, // Reference the Category model
        key: "id",
      },
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
    tableName: "services",
    timestamps: false, // Disable Sequelize's automatic timestamps
  }
);

// Define associations
Service.belongsTo(ServiceProvider, {
  foreignKey: "providerId",
  as: "serviceProvider",
});

Service.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

export default Service;