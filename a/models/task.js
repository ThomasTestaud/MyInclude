const { DataTypes } = require('sequelize');
const sequelizeInstance = require('./_model.js');


const Task = sequelizeInstance.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(50),
        allowNull: false,
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


module.exports = Task;
