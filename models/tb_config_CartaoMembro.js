const { DataTypes } = require('sequelize')

const db = require('../data/conn')
const Igreja = require('./tb_igreja')

const ConfigCartaoMembro = db.define('tb_config_catao_membro',{

    id_config:{
        type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
    cor_frontal_config: {
        type: DataTypes.STRING(100),
        allowNull: false,
        require: true,
    },
    cor_traseira_config: {
        type: DataTypes.STRING(100),
        allowNull: false,
        require: true,
    },
    orientacao_config: {
        type: DataTypes.STRING(100),
        allowNull: false,
        require: true,
    },
   foto: {
        type: DataTypes.STRING(200),
        allowNull: false,
        defaultValue: 'S',
    },
    logo: {
        type: DataTypes.STRING(200),
        allowNull: false,
        defaultValue: 'S',
    },
    status: {
        type: DataTypes.CHAR(1),
        defaultValue: 'A',
        allowNull: false
    }
    
    
}, {timestamps: false, freezeTableName: true})



ConfigCartaoMembro.belongsTo(Igreja, {
    foreignKey: 'id_igreja',
    constraints: true,
})


module.exports = ConfigCartaoMembro