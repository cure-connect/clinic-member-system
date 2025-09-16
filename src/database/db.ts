// import { Sequelize } from '@sequelize/core';
// import { PostgresDialect } from '@sequelize/postgres';

// const sequelize = new Sequelize({
//   dialect: PostgresDialect,
//   database: 'dev',
//   user: 'dev',
//   password: 'P@ssw0rd8812',
//   host: '141.98.17.189',
//   port: 5432,
//   ssl: false,
//   clientMinMessages: 'notice',
// });

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('dev', 'dev', 'P@ssw0rd8812', {
  host: '141.98.17.189',
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
