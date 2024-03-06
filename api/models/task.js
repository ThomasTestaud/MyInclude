const { DataTypes } = require('sequelize');
const sequelizeInstance = require('./_model.js');


const Task = sequelizeInstance.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(300),
        allowNull: true,
    },
    description_1: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    description_2: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    description_3: {
        type: DataTypes.TEXT,
        allowNull: true,
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
