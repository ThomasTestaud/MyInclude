const { DataTypes } = require('sequelize');
const sequelizeInstance = require('./_model.js');
const bcrypt = require('bcrypt');

const User = sequelizeInstance.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    avatar: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email : {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        set(value) {
            this.setDataValue('password', bcrypt.hashSync(value, 12));
        },
    },
    first_day: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    indexes: [
        {unique: true, fields: ['email']},
    ]
});

module.exports = User;
