import Sequelize from 'sequelize';

// This database was running locally on my machine
const getDB = () => {
  const sequelize = new Sequelize('Users', 'root', 'password', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 1,
      min: 0,
      idle: 20000,
    },
  });

  const db = {};

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
};

export default getDB;
