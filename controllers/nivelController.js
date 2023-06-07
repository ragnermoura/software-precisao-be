const Nivel = require("../models/tb_nivel");

async function postNivel(req, res, next) {
  try {
    const novo = await Nivel.create({
      nivel: req.body.nivel,
    });

    const response = {
      dados: {
        mensagem: "Nível Cadastrado com sucesso",
        nivelCriado: {
          id_nivel: novo.id_nivel,
          nivel: novo.nivel,
          request: {
            tipo: "GET",
            descricao: "Pesquisa um nível",
          },
        },
      },
    };

    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
}

async function deleteNivel(req, res, next) {
  try {
    const nivel = await Nivel.findByPk(req.body.id_nivel);
    if (!nivel) {
      return res.status(404).send({ mensagem: "Nível não encontrado." });
    }
    await nivel.destroy();
    return res.status(202).send({ mensagem: "Nível excluído com sucesso!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

async function patchNivel(req, res, next) {
  try {
    const nivelAtualizado = await Nivel.findOneAndUpdate(
      { id_nivel: req.params.id },
      {
        nivel: req.body.newNivel,
      },
      { new: true }
    );

    if (!nivelAtualizado) {
      return res.status(404).send({
        mensagem: "Nível não encontrado",
      });
    }

    const response = {
      dados: {
        mensagem: "Nível atualizado com sucesso",
        nivelAtualizado: {
          id_nivel: nivelAtualizado.id_nivel,
          nivel: nivelAtualizado.nivel,
          request: {
            tipo: "GET",
            descricao: "Pesquisa um nível",
          },
        },
      },
    };

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
}

async function getNivel(req, res, next) {
  try {
    const nivel = await Nivel.findAll();
    return res.status(200).send({ response: nivel });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

async function getNivelId(req, res, next) {
  try {
    const nivel = await Nivel.findByPk(req.params.id_nivel);
    if (!nivel) {
      return res.status(404).send({ mensagem: "Nível não encontrado." });
    }
    return res.status(200).send({ response: nivel });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

module.exports = {
  postNivel,
  deleteNivel,
  patchNivel,
  getNivel,
  getNivelId,
};
