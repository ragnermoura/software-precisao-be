const { Sequelize, DataTypes } = require("sequelize");

const conn = require("../data/conn");
const Usuarios = require("./tb_usuarios");

const Perfil = conn.define(
  "tb_perfil",
  {
    id_perfil: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    id_user: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    telefone1: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    telefone2: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    endereco: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    biografia: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    foto: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

Perfil.belongsTo(Usuarios, {
  foreignKey: "id_user",
  constraints: true,
  foreignKeyConstraint: "id_user",
});


module.exports = Usuarios;
