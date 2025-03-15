import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/dataBase.js';

const PasswordReset = sequelize.define('PasswordReset', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'customers', // References customers table
      key: 'email',
    },
    onDelete: 'CASCADE',
  },
  otp_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,  // Default to false (OTP not verified)
  },
}, {
  tableName: 'password_resets',
  timestamps: true,
});

export default PasswordReset;
