const { DataTypes } = require('sequelize');
const sequelizeInstance = require('./_model.js');


const Task = sequelizeInstance.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title_1: {
        type: DataTypes.STRING(300),
        allowNull: true,
    },
    description_1: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    title_2: {
        type: DataTypes.STRING(300),
        allowNull: true,
    },
    description_2: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    title_3: {
        type: DataTypes.STRING(300),
        allowNull: true,
    },
    description_3: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    doneable: {
        type: DataTypes.BOOLEAN,
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
