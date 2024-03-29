// models/foodMaterials.js
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const item_ingredient = sequelize.define('item_ingredient', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = item_ingredient;
