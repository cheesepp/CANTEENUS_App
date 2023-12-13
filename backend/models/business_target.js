// models/business_target.js
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const BusinessTarget = sequelize.define('Bill', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  target: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = BusinessTarget;