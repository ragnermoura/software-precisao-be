const { Sequelize, DataTypes } = require("sequelize");

const conn = require("../data/conn");
const Usuario = require("./tb_usuarios");

const Igreja = conn.define(
  "tb_igreja",
  {
    id_igreja: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
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
    id_user: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  { freezeTableName: true }
);

Igreja.belongsTo(Usuario, {
  foreignKey: "id_user",
  constraints: true,
  foreignKeyConstraint: true,
});

module.exports = Igreja;