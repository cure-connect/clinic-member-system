import { Sequelize } from 'sequelize';

const { DB_DATABASE, DB_USER, DB_PASSWORD, DB_HOST } = process.env

const sequelize = new Sequelize(`${DB_DATABASE}`, `${DB_USER}`, `${DB_PASSWORD}`, {
  host: DB_HOST,
  dialect: 'postgres'
});

export const DBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connection established successfully.");
  } catch (err) {
    console.error("Unable to connect to PostgreSQL:", err);
  }
};

export default sequelize;
