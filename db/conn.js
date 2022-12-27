const { Sequelize } = require('sequelize');

const db_name = process.env.DATABASE;
const db_user = process.env.USER;
const db_password = process.env.PASSWORD;
const db_host = process.env.HOST;

const sequelize = new Sequelize(db_name, db_user,  db_password,{
    host: db_host,
    dialect: 'mysql'
})

try{
    sequelize.authenticate()
    console.log('Conectado com sucesso')
} catch(err) {
    console.log(`Não foi possível conectar: ${err}`)
}

module.exports = sequelize