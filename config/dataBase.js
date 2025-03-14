import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: "config.env" });
export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER,process.env.DB_PASS, {
  host: process.env.DB_HOST,
    dialect: "mysql",
    timezone: "+02:00", 
    logging: false,
});

const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database Connected');
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
export default  dbConnection ;