const { Sequelize, DataTypes } = require("sequelize");

const conn = require("../data/conn");
const nivel = require("./tb_nivel");

const Usuario = conn.define(
  "tb_usuarios",
  {
    id_user: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sobrenome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    telefone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    code: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [4, 4],
      },
    },
    senha: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    id_nivel: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.CHAR(1),
      defaultValue: 'A',
      allowNull: false
  }
  },
  { freezeTableName: true }
);

Usuario.belongsTo(nivel, {
  foreignKey: "id_nivel",
  constraints: true,
  foreignKeyConstraint: "id_nivel",
});

module.exports = Usuario;
