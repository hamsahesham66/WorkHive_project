import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({ path: "config.env" });
export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER,process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
    dialect: "mysql",
    dialectModule: mysql2,
    logging: false,
});

const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database Connected');
   // await sequelize.sync({ alter: true });
    //console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
export default  dbConnection ;