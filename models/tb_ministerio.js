const { DataTypes } = require('sequelize')

const db = require('../data/conn')
const Igreja = require('./tb_igreja')

const Ministeiro = db.define('tb_ministerio',{

    id_ministerio:{
        type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
    nome_ministerio: {
        type: DataTypes.STRING(150),
        allowNull: false,
        require: true,
    },
    descricao_ministerio: {
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


Ministeiro.belongsTo(Igreja, {
    foreignKey: 'id_igreja',
    constraints: true,
})



module.exports = Ministeiro