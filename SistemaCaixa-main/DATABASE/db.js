var Sequelize = require('sequelize');
var sequelize = new Sequelize("sistemacaixa", "root", "vertrigo", {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('Conexao OK')
} catch (err) {
    console.log('DB Error: ' + err.message);
}



module.exports = sequelize;