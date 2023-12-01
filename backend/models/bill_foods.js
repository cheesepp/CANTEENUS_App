// models/billFoods.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const BillFoods = sequelize.define('BillFoods', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = BillFoods;
