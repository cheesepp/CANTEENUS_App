// models/billFoods.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const bill_item = sequelize.define('bill_item', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = bill_item;
