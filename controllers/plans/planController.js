const pagarMe = require("pagarme");
const Plano = require("../../models/tb_planos");
require("dotenv").config();

module.exports = class PlanController {
  static async createNewPlan(req, res) {
    const {
      nome,
      metodos,
      free_days,
      descricao,
      descricao_extrato_cartao,
      items,
      entrega,
      parcelas,
      intervalo,
      interval_count,
      billing_days,
      billing_type,
      metadata,
      priceScheme,
      quantidade,
    } = req.body;

    if (!descricao) {
      res.status(422).json({
        success: false,
        message: "A descrição é necessária",
      });
      return;
    }
    if (!descricao_extrato_cartao) {
      res.status(422).json({
        success: false,
        message: "A descrição é necessária para aparecer no extrato do cartão",
      });
      return;
    }

    if (!intervalo) {
      res.status(422).json({
        success: false,
        message: "o intervalo de meses é necessário",
      });
      return;
    }

    if (!nome) {
      res.status(422).json({
        success: false,
        message: "O nome do plano é necessário",
      });
      return;
    }

    if (!metodos) {
      res.status(422).json({
        success: false,
        message: "Os métodos de pagamentos é necessário",
      });
      return;
    }

    if (!free_days && free_days < 1 ) {
      res.status(422).json({
        success: false,
        message: "quantidades de dias gratuitos é necessário",
      });
      return;
    }

    if (!interval_count) {
      res.status(422).json({
        success: false,
        message:
          "Insira o intervalo de pagamento em meses, recomendado é de 1 mês",
      });
      return;
    }

    if (typeof entrega !== "boolean") {
      res.status(422).json({
        success: false,
        message: "É necessário saber se é possível fazer entrega ou não",
      });
      return;
    }

    if (!parcelas) {
      res.status(422).json({
        success: false,
        message: "É necessário saber o numero de parcelas",
      });
      return;
    }

    if (!billing_type) {
      res.status(422).json({
        success: false,
        message: "Escolha entre pagamento pré-pago, pós-pago ou dia exato",
        valoresPossiveis:
          "Os valores possíveis são prepaid, postpaid e exact_day",
      });
      return;
    }

    if (!billing_days && billing_type === "exact_day") {
      res.status(422).json({
        success: false,
        message: "selecione as datas para pagamento exato",
      });
      return;
    }

    if (typeof priceScheme !== "object") {
      res.status(422).json({
        success: false,
        message: "o Schema precisa ser um objeto",
      });
      return;
    }

    if (!priceScheme?.scheme_type) {
      res.status(422).json({
        success: false,
        message: "Escolha o tipo do plano sé unidade, pacote, volume e tier",
        valoresPossiveis:
          "Os valores possíveis são unit, package, volume e tier",
      });
      return;
    }

    if (!priceScheme?.price && priceScheme?.scheme_type === "unit") {
      res.status(422).json({
        success: false,
        message: "Como escolheu a opção unit selecione o preço",
      });
      return;
    }

    if (!quantidade && priceScheme?.scheme_type === "unit") {
      res.status(422).json({
        success: false,
        message:
          "Como escolheu a opção unit selecione uma quantidade o máximo é 2147483647",
      });
      return;
    }

    if (!priceScheme?.price_brackets && priceScheme?.scheme_type !== "unit") {
      res.status(422).json({
        success: false,
        message:
          "Como escolheu a opção unit selecione o precisa preencher o priceBrackets",
      });
      return;
    }

    /*     const pagarmeClient = await pagarMe.client.connect({
            email: process.env.PAGARME_API_KEY,
            password: ''
        }).catch(err => console.log('error', err))
     */

    const plan = {
      name: nome,
      description: descricao,
      statement_descriptor: descricao_extrato_cartao,
      payment_methods: metodos,
      trial_period_days: free_days,
      metadata: metadata === undefined ? {} : metadata,
      items: items === undefined ? [] : items,
      currency: "BRL",
      shippable: entrega,
      installments: parcelas,
      interval: intervalo,
      interval_count,
      billing_type,
      billing_days: billing_days === undefined ? [] : billing_days,
      pricing_scheme: priceScheme,
      quantity: quantidade,
    };


    const reqPlan = await fetch('https://api.pagar.me/core/v5/plans', {
      method: 'POST',
      headers: {
          accept: 'application/json',
  'content-type': 'application/json',
  'Authorization': `Basic ${Buffer.from(process.env.PAGARME_API_KEY + ':').toString('base64')}`
      },
      body: JSON.stringify(plan)
  })

  console.log('request',reqPlan)

  const newPlan= await reqPlan?.json()

  const body = {
    id_plano_pagarme : newPlan?.id,
    nome_plano: nome,
    descricao: descricao,
    limit,
    preco: (priceScheme?.price)/100,
    metodos_pagamento: metodos?.join(', ')
  }

  await Plano.create(body)

    /* 
            const newPlan = await pagarmeClient.plans.create(plan) */

    res.status(200).json({
      success: true,
      message: "Plano criado com sucesso",
      plano: newPlan,
    });
  }
};
