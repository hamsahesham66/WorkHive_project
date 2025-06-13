import { Sequelize,DataTypes } from "sequelize";
import { sequelize } from "../config/dataBase.js";
import Customers from "./customers.js"; 
import Bookings from "./bookingsModel.js"; 
import AdditionalWorkRequests from "./additionalWorkRequestsModel.js"; 
import ServiceProvider from "./serviceProviderModel.js";
const WorkNotifications = sequelize.define("WorkNotifications", {
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
      model: Customers, 
      key: "id",         
    },
   
  },
  booking_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Bookings, 
      key: "id",        
    },
   
  },
  additional_work_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "additional_work_requests",
      key: "id",
    },
   
  },
  worker_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: ServiceProvider, 
      key: "id",
    },
   
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue:0,
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
  tableName: "work_notifications", 
  timestamps: false,              
});
// Define associations
WorkNotifications.belongsTo(Customers, {
  foreignKey: "customer_id",
  as: "customer",
});
WorkNotifications.belongsTo(Bookings, {
  foreignKey: "booking_id",
  as: "booking",
});
WorkNotifications.belongsTo(AdditionalWorkRequests, {
  foreignKey: "additional_work_id",
  as: "additionalWork",
});
WorkNotifications.belongsTo(ServiceProvider, {
    foreignKey: "worker_id",
    as: "serviceProvider",
  });


export default WorkNotifications;