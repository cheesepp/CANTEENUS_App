// models/material.js
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Material = sequelize.define('Material', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    unit: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    expirationDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
});

module.exports = Material;
