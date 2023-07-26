const { DataTypes } = require('sequelize')

const db = require('../data/conn')
const Igreja = require('./tb_igreja')
const Cargo = require('./tb_cargo')
const Funcoes = require('./tb_funcao')

const Membro = db.define('tb_membro',{

    id_membro:{
        type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },

    nome_membro:{ type: DataTypes.STRING(200),
        allowNull: true,
        require: false,},
    genero_membro:{ type: DataTypes.STRING(30),
        allowNull: true,
        require: false,},
    cep_membro:{ type: DataTypes.STRING(12),
        allowNull: true,
        require: false,},
    endereco_membro:{ type: DataTypes.STRING(150),
        allowNull: true,
        require: false,},
    numero_membro:{ type: DataTypes.STRING(5),
        allowNull: true,
        require: false,},
    complemento_membro:{ type: DataTypes.STRING(150),
        allowNull: true,
        require: false,},
    dataNascimento_membro:{ type: DataTypes.DATE,
        allowNull: true,
        require: false,},
    nomePai_membro:{ type: DataTypes.STRING(150),
        allowNull: true,
        require: false,},
    nomeMae_membro:{ type: DataTypes.STRING(150),
        allowNull: true,
        require: false,},
    telefone1_membro:{ type: DataTypes.STRING(20),
        allowNull: true,
        require: false,},
    telefone2_membro:{ type: DataTypes.STRING(20),
        allowNull: true,
        require: false,},
    email_membro:{ type: DataTypes.STRING(150),
        allowNull: true,
        require: false,},
    profissao_membro:{ type: DataTypes.STRING(150),
        allowNull: true,
        require: false,},
    dataFiliacao_membro:{ type: DataTypes.DATE,
        allowNull: true,
        require: false,},
    dataBatismo_membro:{ type: DataTypes.DATE,
        allowNull: true,
        require: false,},

    
    datacreate_membro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.CHAR(1),
        defaultValue: 'A',
        allowNull: false
    }

}, {timestamps: false, freezeTableName: true})

Membro.belongsTo(Igreja, {
    foreignKey: 'id_igreja',
    constraints: true,
})
Membro.belongsTo(Cargo, {
    foreignKey: 'id_cargo',
    constraints: true
})
Membro.belongsTo(Funcoes, {
    foreignKey: 'id_funcao',
    constraints: true
})

module.exports = Membro