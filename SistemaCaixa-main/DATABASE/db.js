var Sequelize = require('sequelize');
var sequelize = new Sequelize("sistemacaixa", "root", "root", {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

try {
    sequelize.authenticate();
    console.log('Conexao OK')
} catch (err) {
    console.log('DB Error: ' + err.message);
}



module.exports = sequelize;