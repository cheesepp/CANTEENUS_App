// models/foodMaterials.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const FoodMaterials = sequelize.define('FoodMaterials', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = FoodMaterials;
