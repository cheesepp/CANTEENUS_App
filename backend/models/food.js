// models/food.js
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Food = sequelize.define('Food', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

module.exports = Food;
