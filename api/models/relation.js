const { DataTypes } = require('sequelize');
const sequelizeInstance = require('./_model.js');


const Relation = sequelizeInstance.define('Relation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    associate_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    mentor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    captain_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
});

module.exports = Relation;
