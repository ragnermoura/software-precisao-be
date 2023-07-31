require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/tb_usuarios");
const Assinatura_User = require("../models/tb_user_assinatura");

router.post("/", (req, res, next) => {
  Usuario.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(401).send({
          mensagem: "Falha na autenticação.",
        });
      }
      bcrypt.compare(req.body.senha, user.senha, async (err, result) => {
        if (err) {
          return res.status(401).send({ mensagem: "Falha na autenticação." });
        }
        if (result) {
          const token = jwt.sign(
            {
              id_user: user.id_user,
              nome: user.nome,
              sobrenome: user.sobrenome,
              email: user.email,
              senha: user.senha,
              id_nivel: user.id_nivel,
              id_status: user.id_status,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "6h",
            }
          );

            
const assinatura = await Assinatura_User.findOne({
  where: {
    id_user: user?.id_user
  }
})

const reqAssinatura_fatura = await fetch(`https://api.pagar.me/core/v5/invoices?subscription_id=${assinatura?.id_assinatura}&page=1&size=10`, {
method: 'GET',
headers: {
accept: 'application/json',
'content-type': 'application/json',
'Authorization': `Basic ${Buffer.from(process.env.PAGARME_API_KEY + ':').toString('base64')}`
},
})
const reqAssinatura = await fetch(`https://api.pagar.me/core/v5//v5/subscriptions/${assinatura?.id_assinatura}`, {
method: 'GET',
headers: {
accept: 'application/json',
'content-type': 'application/json',
'Authorization': `Basic ${Buffer.from(process.env.PAGARME_API_KEY + ':').toString('base64')}`
},
})


const verifyPayment = await reqAssinatura_fatura?.json()
const verifySubscribe = await reqAssinatura?.json()
console.log('request', reqAssinatura_fatura)


const {data} = verifyPayment
const order = data?.sort( (a,b) => {
return new Date(b?.created_at) - new Date(a?.created_at)
})

const invoice = order[0]
console.log(invoice)

if(invoice?.status === 'paid' || verifySubscribe?.status === 'future'){


  return res.status(200).send({
    success: true,
    mensagem: "Autenticado com sucesso!",
    token: token,
    user_id: user.id_user
  });
} else {
  return res.status(401).send({
    success: false,
    mensagem: "Acesso não autorizado, seu pagamento ainda está pendente",
  });
}
}
        return res.status(401).send({ mensagem: "Falha na autenticação." });
      });
    })
    .catch(error => {
      return res.status(500).send({ error: error });
    });
});

module.exports = router;