const { DataTypes } = require('sequelize')

const db = require('../data/conn')
const Igreja = require('./tb_igreja')

const Cargo = db.define('tb_cargo',{

    id_cargo:{
        type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
    nome_cargo: {
        type: DataTypes.STRING(150),
        allowNull: false,
        require: true,
    },
    descricao_cargo: {
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


Cargo.belongsTo(Igreja, {
    foreignKey: 'id_igreja',
    constraints: true,
})



module.exports = Cargo