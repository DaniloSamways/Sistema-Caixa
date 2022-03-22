const Sequelize = require('sequelize');
const db = require('../db');

const movimento = db.define('movimentos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    data: {
        type: Sequelize.DATE,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    valor: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    tipo: {
        type: Sequelize.STRING(1),
        allowNull: false
    }
});

module.exports = movimento