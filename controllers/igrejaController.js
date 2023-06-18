const Igreja = require("../models/tb_igreja");
const { imageUpload } = require("../helpers/image-upload");

async function postIgreja(req, res, next) {
  try {

    await imageUpload.single("imagem")(req, res, next);

    const igreja = await Igreja.create({
      razao_social: req.body.razao_social,
      cnpj: req.body.cnpj,
      endereco: req.body.endereco,
      email: req.body.email,
      telefone1: req.body.telefone1,
      telefone2: req.body.telefone2,
      qtd_membros: req.body.qtd_membros,
      nome_pastor: req.body.pastor,
      logo: req.file.filename,
      id_user: req.body.id_user,
    });

    const response = {
      dados: {
        mensagem: "Igreja cadastrada com sucesso",
        igrejaCriada: {
          id_igreja: igreja.id_igreja,
          razao_social: igreja.razao_social,
          id_user: igreja.id_user,
          request: {
            tipo: "GET",
            descricao: "Pesquisa uma Igreja",
          },
        },
      },
    };

    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
}

async function deleteIgreja(req, res, next) {
  try {
    const igreja = await Igreja.findByPk(req.body.id_igreja);
    if (!igreja) {
      return res.status(404).send({ mensagem: "Igreja não encontrada." });
    }
    await igreja.destroy();
    return res.status(202).send({ mensagem: "Igreja excluída com sucesso!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

async function patchIgreja(req, res, next) {
  try {
    const igrejaAtualizada = await Igreja.findOneAndUpdate(
      { id_igreja: req.params.id_igreja },
      {
        razao_social: req.body.razao_social,
        cnpj: req.body.razao_social,
        endereco: req.body.endereco,
        email: req.body.email,
        telefone1: req.body.telefone1,
        telefone2: req.body.telefone2,
        qtd_membros: req.body.qtd_membros,
      },
      { new: true }
    );

    if (!igrejaAtualizada) {
      return res.status(404).send({
        mensagem: "Igreja não encontrada",
      });
    }

    const response = {
      dados: {
        mensagem: "Igreja atualizada com sucesso",
        igrejaAtualizada: {
          id_igreja: igrejaAtualizada.id_igreja,
          razao_social: igrejaAtualizada.razao_social,
          request: {
            tipo: "GET",
            descricao: "Pesquisa uma Igreja",
          },
        },
      },
    };

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
}

async function getIgreja(req, res, next) {
  try {
    const igreja = await Igreja.findAll();
    return res.status(200).send({ response: igreja });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

async function getIgrejaId(req, res, next) {
  try {
    const igreja = await Igreja.findByPk(req.params.id_igreja);
    if (!igreja) {
      return res.status(404).send({ mensagem: "Igreja não encontrada." });
    }
    return res.status(200).send({ response: igreja });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

module.exports = {
  postIgreja,
  deleteIgreja,
  patchIgreja,
  getIgreja,
  getIgrejaId,
};
