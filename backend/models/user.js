const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const User = sequelize.define('user', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    role:  {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name:  {
        type: Sequelize.STRING,
        allowNull: false,
    },

    avatar: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    
    phone:  {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password:  {
        type: Sequelize.STRING,
        allowNull: false,
    },

})

module.exports = User