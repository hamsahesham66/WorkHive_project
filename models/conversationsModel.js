import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/dataBase.js";
import Customer from "./customers.js";
const Conversations = sequelize.define("Conversations", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Customer, // Reference the customers table
      key: "id",          // Reference the id column in the customers table
    },
   
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Default to current timestamp
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Default to current timestamp
    onUpdate: DataTypes.NOW,     // Automatically update timestamp on changes
  },
}, {
  tableName: "conversations", // Map to the table name in the database
  timestamps: false,         // Disable Sequelize's automatic timestamps
});
Conversations.belongsTo(Customer, {
    foreignKey: "customer_id",
    as: "customer", 
  });

export default Conversations;