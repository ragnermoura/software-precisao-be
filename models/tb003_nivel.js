const { DataTypes } = require('sequelize')

const db = require('../db/conn')
const User = require('./tb001_user')

const Nivel = db.define('tb003_nivel',{

    id_nivel:{
        type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
    nome_nivel: {
        type: DataTypes.STRING(100),
        allowNull: false,
        require: true,
    },
   descricao_nivel: {
        type: DataTypes.STRING(255),
        allowNull: false,
        require: true,
    },
    
    
}, {timestamps: false, freezeTableName: true})


module.exports = Nivel