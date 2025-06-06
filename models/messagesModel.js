import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/dataBase.js";
import Conversations from "./conversationsModel.js"; // Import the Conversations model
const Messages = sequelize.define("Messages", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  conversation_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Conversations, // Reference the conversations table
      key: "id",              // Reference the id column in the conversations table
    },

  },
  sender_type: {
    type: DataTypes.ENUM("user", "provider"), // Enum for sender type
    allowNull: false,
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  is_read: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, // Default value is false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Default to current timestamp
  },
}, {
  tableName: "messages", // Map to the table name in the database
  timestamps: false,     // Disable Sequelize's automatic timestamps
});

// Define associations
Messages.belongsTo(Conversations, {
  foreignKey: "conversation_id",
  as: "conversation",
});
export default Messages;