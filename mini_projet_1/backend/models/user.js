const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    emailId: {
        type: DataTypes.STRING(45),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,   // correspond à LONGTEXT
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: false
});

module.exports = User;
