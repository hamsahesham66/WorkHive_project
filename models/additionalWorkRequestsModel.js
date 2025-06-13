import { Sequelize,DataTypes } from "sequelize";
import { sequelize } from "../config/dataBase.js";
import Bookings from "./bookingsModel.js";
import ServiceProvider from "./serviceProviderModel.js";
import Customers from "./customers.js"; // Import the Customers model

const AdditionalWorkRequests = sequelize.define("AdditionalWorkRequests", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  booking_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Bookings, 
      key: "id",       
    },
  
  },
  service_provider_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ServiceProvider, 
      key: "id",                
    },
   
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Customers, 
      key: "id",          
    },

  },
  customer_phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("pending", "approved", "rejected", "completed"), 
    allowNull: false,
    defaultValue: "pending", // Default to "pending"
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
  tableName: "additional_work_requests",
  timestamps: false,                    
});
// Define associations
AdditionalWorkRequests.belongsTo(Bookings, {
  foreignKey: "booking_id",
  as: "booking", 
});
AdditionalWorkRequests.belongsTo(ServiceProvider, {
  foreignKey: "service_provider_id",
  as: "serviceProvider", 
});
AdditionalWorkRequests.belongsTo(Customers, {
  foreignKey: "customer_id",
  as: "customer", 
}); 

export default AdditionalWorkRequests;