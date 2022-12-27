const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Planos = db.define('tb002_plano',{

    id_plano:{
        type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
    nome_plano: {
        type: DataTypes.STRING(100),
        allowNull: false,
        require: true,
    },
   descricao_plano: {
        type: DataTypes.STRING(255),
        allowNull: false,
        require: true,
    },
    valor_plano:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        require: true
    },
    
}, {timestamps: false, freezeTableName: true})



module.exports = Planos