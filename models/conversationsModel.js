import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/dataBase.js";
import Customer from "./customers.js";
import Admin from "./adminModel.js"; // Import the Admin model
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
      model: Customer,
      key: "id",         
    },
   
  },
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1, // Default value for admin_id
    references: {
      model: Admin, 
      key: "id",    
    },
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, 
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, 
    onUpdate: DataTypes.NOW,
  },
}, {
  tableName: "conversations", 
  timestamps: false,         
});
Conversations.belongsTo(Customer, {
    foreignKey: "customer_id",
    as: "customer", 
  });

Conversations.belongsTo(Admin, {
    foreignKey: "admin_id",
    as: "admin", 
  }); 
export default Conversations;