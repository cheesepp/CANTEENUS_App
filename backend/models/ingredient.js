// models/material.js
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Ingredient = sequelize.define('ingredient', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    calories: {
        type: Sequelize.FLOAT,
        allowNull: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    unit: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    expirationdate: {
        type: Sequelize.DATE,
        allowNull: true,
    },
});

module.exports = Ingredient;
