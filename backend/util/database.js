// config/database.js
// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(
//   'canteenus',
//   'root', 
//   '123456', {
//   host: '127.0.0.1',
//   dialect: 'mysql',
// });

// module.exports = sequelize;

const { Sequelize } = require('sequelize');
require('dotenv').config()
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER, 
  process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

module.exports = sequelize;
