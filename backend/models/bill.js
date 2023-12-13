// models/bill.js
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Bill = sequelize.define('Bill', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  totalPrice: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
  },
});

module.exports = Bill;