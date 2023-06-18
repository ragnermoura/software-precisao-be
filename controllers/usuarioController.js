const Usuario = require("../models/tb_usuarios");
const bcrypt = require("bcrypt");

async function postCadastro(req, res, next) {
  try {
    const usuario = await Usuario.findOne({
      where: { email: req.body.email },
    });

    if (usuario) {
      return res.status(409).send({
        mensagem: "Email já cadastrado, por favor insira um email diferente!",
      });
    }

    const senhaHash = await bcrypt.hash(req.body.senha, 10);

    const novoUsuario = await Usuario.create({
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      email: req.body.email,
      code: req.body.code,
      senha: senhaHash,
      id_nivel: req.body.nivel,
      id_igreja: req.body.igreja,
      id_perfil: req.body.perfil,
    });

    const response = {
      dados: {
        mensagem: "Usuário cadastrado com sucesso",
        usuarioCriado: {
          id_user: novoUsuario.id_user,
          nome: novoUsuario.nome,
          sobrenome: novoUsuario.sobrenome,
          email: novoUsuario.email,
          nivel: novoUsuario.id_nivel,
          request: {
            tipo: "GET",
            descricao: "Pesquisa um usuário",
          },
        },
      },
    };

    return res.status(202).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
}

async function deleteCadastro(req, res, next) {
  try {
    const usuario = await Usuario.findByPk(req.body.id_user);
    if (!usuario) {
      return res.status(404).send({ mensagem: "Usuário não encontrado." });
    }
    await usuario.destroy();
    return res.status(202).send({ mensagem: "Usuário excluído com sucesso!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

async function patchCadastro(req, res, next) {
  try {
    const senhaHash = await bcrypt.hash(req.body.newPassword, 10);

    const usuarioAtualizado = await Usuario.findOneAndUpdate(
      { email: req.body.email },
      {
        nome: req.body.newNome,
        sobrenome: req.body.newSobrenome,
        email: req.body.newEmail,
        senha: senhaHash,
        id_nivel: req.body.newNivel,
        id_igreja: req.body.newIgreja,
        id_perfil: req.body.newPerfil,
      },
      { new: true }
    );

    if (!usuarioAtualizado) {
      return res.status(404).send({
        mensagem: "Usuário não encontrado",
      });
    }

    const response = {
      dados: {
        mensagem: "Usuário atualizado com sucesso",
        usuarioAtualizado: {
          id_user: usuarioAtualizado.id_user,
          nome: usuarioAtualizado.nome,
          sobrenome: usuarioAtualizado.sobrenome,
          email: usuarioAtualizado.email,
          nivel: usuarioAtualizado.id_nivel,
          request: {
            tipo: "GET",
            descricao: "Pesquisa um usuário",
          },
        },
      },
    };

    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
}

async function getCadastro(req, res, next) {
  try {
    const usuarios = await Usuario.findAll();
    return res.status(200).send({ response: usuarios });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

async function getCadastroId(req, res, next) {
  try {
    const usuario = await Usuario.findByPk(req.params.id_user);
    if (!usuario) {
      return res.status(404).send({ mensagem: "Usuário não encontrado." });
    }
    return res.status(200).send({ response: usuario });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

module.exports = {
  postCadastro,
  deleteCadastro,
  patchCadastro,
  getCadastro,
  getCadastroId
};
