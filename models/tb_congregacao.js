const { Sequelize, DataTypes } = require("sequelize");

const conn = require("../data/conn");
const Usuario = require("./tb_usuarios");
const Igreja = require("./tb_igreja");

const Congregacao = conn.define(
  "tb_congregacao",
  {
    id_congregacao: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    id_user: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    id_igreja: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    razao_social: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cnpj: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    endereco: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    telefone1: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    telefone2: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    qdt_membros: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  { freezeTableName: true }
);

Congregacao.belongsTo(Usuario, {
  foreignKey: "id_user",
  constraints: true,
  foreignKeyConstraint: true,
});

Congregacao.belongsTo(Igreja, {
  foreignKey: "id_igreja",
  constraints: true,
  foreignKeyConstraint: true,
});

module.exports = Congregacao;
