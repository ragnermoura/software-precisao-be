const { DataTypes } = require('sequelize')

const db = require('../db/conn')
const Planos = require('./tb002_plano')
const Nivel = require('./tb003_nivel')

const User = db.define('tb001_user',{

    id_user:{
        type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
    nome_user: {
        type: DataTypes.STRING(255),
        allowNull: false,
        require: true,
    },
   email_user: {
        type: DataTypes.STRING(180),
        allowNull: false,
        require: true,
    },
    senha_user:{
        type: DataTypes.STRING(30),
        allowNull: false,
        require: true
    },
    telefone_user: {
        type: DataTypes.STRING(255),
        allowNull: false,
        require: true
    },
    datacreate_user: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    id_plano: {
        type: DataTypes.INTEGER,
        allowNull: false,
        require: true
    },
    id_nivel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        require: true
    },
    code_sms: {
        type: DataTypes.STRING(4),
        allowNull: false,
        require: true
    },

}, {timestamps: false, freezeTableName: true})


User.belongsTo(Nivel, {
    foreignKey: 'id_nivel',
    constraints: true,
})

User.belongsTo(Planos, {
    foreignKey: 'id_plano',
    constraints: true,
})


module.exports = User