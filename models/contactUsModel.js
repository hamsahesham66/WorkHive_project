import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/dataBase.js"; 

const ContactUs = sequelize.define(
    "ContactUs",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true, 
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: 'Must be a valid email',
          },
        },
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
    },
    {
      tableName: "contactUs", 
      timestamps: false,
    }
  );
  
  export default ContactUs;