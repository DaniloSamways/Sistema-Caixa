const Sequelize = require('sequelize');
const db = require('../db');

const saldo = db.define('saldos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    data: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false
    },
    valor: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
});

module.exports = saldo