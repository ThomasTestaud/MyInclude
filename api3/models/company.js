const { DataTypes } = require('sequelize');
const sequelizeInstance = require('./_model.js');

const Company = sequelizeInstance.define('Company', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    avatar: {
        type: DataTypes.STRING(100),
        defaultValue: 'default_company.png',
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    address: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
}, {
    indexes: [
        {unique: true, fields: ['name']},
        {unique: true, fields: ['email']}
    ]
});


module.exports = Company;
