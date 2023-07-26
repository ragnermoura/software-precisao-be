const { DataTypes } = require('sequelize')

const db = require('../data/conn')
const Igreja = require('./tb_igreja')

const Funcoes = db.define('tb_funcao',{

    id_funcao:{
        type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
    nome_funcao: {
        type: DataTypes.STRING(150),
        allowNull: false,
        require: true,
    },
    descricao_funcao: {
        type: DataTypes.STRING(255),
        allowNull: false,
        require: true,
    },
    status: {
        type: DataTypes.CHAR(1),
        defaultValue: 'A',
        allowNull: false
    }
    
}, {timestamps: false, freezeTableName: true})

Funcoes.belongsTo(Igreja, {
    foreignKey: 'id_igreja',
    constraints: true,
})



module.exports = Funcoes