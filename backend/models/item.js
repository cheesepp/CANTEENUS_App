// models/food.js
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Item = sequelize.define('item', {
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
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Item;
