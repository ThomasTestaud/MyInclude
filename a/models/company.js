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
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
}, {
    indexes: [
        {unique: true, fields: ['name']},
        {unique: true, fields: ['email']}
    ]
});


module.exports = Company;
