const Congregacao = require("../models/tb_congregacao");

async function postCongregacao(req, res, next) {
  try {
    const congregacao = await Congregacao.create({
      razao_social: req.body.razao_social,
      cnpj: req.body.razao_social,
      endereco: req.body.endereco,
      email: req.body.email,
      telefone1: req.body.telefone1,
      telefone2: req.body.telefone2,
      qtd_membros: req.body.qtd_membros,
    });

    const response = {
      dados: {
        mensagem: "Congregação cadastrada com sucesso",
        congregacaoCriada: {
          id_congregacao: congregacao.id_congregacao,
          razao_social: congregacao.razao_social,
          request: {
            tipo: "GET",
            descricao: "Pesquisa uma Congregação",
          },
        },
      },
    };

    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
}

async function deleteCongregacao(req, res, next) {
  try {
    const congregacao = await Congregacao.findByPk(req.body.id_congregacao);
    if (!congregacao) {
      return res.status(404).send({ mensagem: "Congregacao não encontrada." });
    }
    await congregacao.destroy();
    return res
      .status(202)
      .send({ mensagem: "Congregacao excluída com sucesso!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

async function patchCongregacao(req, res, next) {
  try {
    const congregacaoAtualizada = await Congregacao.findOneAndUpdate(
      { id_congregacao: req.params.id_congregacao },
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

    if (!congregacaoAtualizada) {
      return res.status(404).send({
        mensagem: "Congregação não encontrada",
      });
    }

    const response = {
      dados: {
        mensagem: "Congregação atualizada com sucesso",
        congregacaoAtualizada: {
          id_congregacao: congregacaoAtualizada.id_congregacao,
          razao_social: congregacaoAtualizada.razao_social,
          request: {
            tipo: "GET",
            descricao: "Pesquisa uma congregação",
          },
        },
      },
    };

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
}

async function getCongregacao(req, res, next) {
  try {
    const congregacao = await Congregacao.findAll();
    return res.status(200).send({ response: congregacao });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

async function getCongregacaoId(req, res, next) {
  try {
    const congregacao = await Congregacao.findByPk(req.params.id_congregacao);
    if (!congregacao) {
      return res.status(404).send({ mensagem: "Congregação não encontrada." });
    }
    return res.status(200).send({ response: congregacao });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

module.exports = {
  postCongregacao,
  deleteCongregacao,
  patchCongregacao,
  getCongregacao,
  getCongregacaoId,
};
