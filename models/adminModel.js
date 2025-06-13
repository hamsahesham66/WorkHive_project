import { Sequelize,DataTypes } from "sequelize";
import { sequelize } from "../config/dataBase.js";

const Admin = sequelize.define("Admin", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true, 
    validate: {
      isEmail: true, 
    },
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
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
  tableName: "admin", // Map to the table name in the database
  timestamps: false, // Disable Sequelize's automatic timestamps
});

export default Admin;