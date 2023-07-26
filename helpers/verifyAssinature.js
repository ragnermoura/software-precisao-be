
const assinatura = await Assinatura_User.findOne({
    where: {
      id_user: user?.id_user
    }
  })

  const reqAssinatura = await fetch(`https://api.pagar.me/core/v5/invoices?subscription_id=${assinatura?.id_assinatura}&page=1&size=10`, {
method: 'GET',
headers: {
  accept: 'application/json',
'content-type': 'application/json',
'Authorization': `Basic ${Buffer.from(process.env.PAGARME_API_KEY + ':').toString('base64')}`
},
})


const verifyPayment = await reqAssinatura?.json()
console.log('request', reqAssinatura)


const {data} = verifyPayment
const order = data?.sort( (a,b) => {
return new Date(b?.created_at) - new Date(a?.created_at)
})

const invoice = order[0]
console.log(invoice)