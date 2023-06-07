const Perfil = require("../models/tb_perfil");

async function postPerfil(req, res, next) {
  try {
    const novo = await Perfil.create({
      perfil: req.body.perfil,
    });

    const response = {
      dados: {
        mensagem: "Perfil Cadastrado com sucesso",
        perfilCriado: {
          id_perfil: novo.id_perfil,
          perfil: novo.perfil,
          request: {
            tipo: "GET",
            descricao: "Pesquisa um Perfil",
          },
        },
      },
    };

    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
}

async function deletePerfil(req, res, next) {
  try {
    const perfil = await Perfil.findByPk(req.body.id_perfil);
    if (!perfil) {
      return res.status(404).send({ mensagem: "Perfil não encontrado." });
    }
    await perfil.destroy();
    return res.status(202).send({ mensagem: "Perfil excluído com sucesso!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

async function patchPerfil(req, res, next) {
  try {
    const perfilAtualizado = await Perfil.findOneAndUpdate(
      { id_perfil: req.params.id },
      {
        perfil: req.body.newPerfil,
      },
      { new: true }
    );

    if (!perfilAtualizado) {
      return res.status(404).send({
        mensagem: "Perfil não encontrado",
      });
    }

    const response = {
      dados: {
        mensagem: "Perfil atualizado com sucesso",
        perfilAtualizado: {
          id_perfil: perfilAtualizado.id_perfil,
          perfil: perfilAtualizado.perfil,
          request: {
            tipo: "GET",
            descricao: "Pesquisa um perfil",
          },
        },
      },
    };

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
}

async function getPerfil(req, res, next) {
  try {
    const perfil = await Perfil.findAll();
    return res.status(200).send({ response: perfil });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

async function getPerfilId(req, res, next) {
  try {
    const perfil = await Nivel.findByPk(req.params.id_perfil);
    if (!perfil) {
      return res.status(404).send({ mensagem: "Perfil não encontrado." });
    }
    return res.status(200).send({ response: perfil });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

module.exports = {
  postPerfil,
  deletePerfil,
  patchPerfil,
  getPerfil,
  getPerfilId,
};
