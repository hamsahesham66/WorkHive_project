import { Sequelize,DataTypes } from "sequelize";
import { sequelize } from "../config/dataBase.js";
import Category from "./categoriesModel.js"; 
const WorkersApplications = sequelize.define("WorkersApplications", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true, // Ensure valid email format
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  photo: {
    type: DataTypes.BLOB("long"),
    allowNull: true,
  },
  front_id: {
    type: DataTypes.BLOB("long"),
    allowNull: true,
  },
  back_id: {
    type: DataTypes.BLOB("long"),
    allowNull: true,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category, // Assuming you have a categories table
      key: 'id',
    },
  },
  working_days: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      isJson(value) {
        try {
          JSON.parse(value); // Ensure valid JSON format
        } catch (error) {
          throw new Error("Working days must be a valid JSON string");
        }
      },
    },
  },
  experience: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  terms: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  submitted_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "workers_applications", // Map to the table name in the database
  timestamps: false, // Disable Sequelize's automatic timestamps
});

WorkersApplications.belongsTo(Category, {
    foreignKey: "categoryId",
    as: "category", // Alias for the relationship
  });
  

export default WorkersApplications;