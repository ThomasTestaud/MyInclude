const { DataTypes } = require('sequelize');
const sequelizeInstance = require('./_model.js');


const TaskToRelation = sequelizeInstance.define('TaskToRelation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    done_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    indexes: [
    ]
});


module.exports = TaskToRelation;
