const Assinatura_User = require("../../models/tb_user_assinatura");

require("dotenv").config();

module.exports = class SubscriptionsController {
  static async CreateSubscription(req, res) {
      try {

      

        const { id_plano, metodoPagamento, email, celular, endereco, id_user } = req.body
        
/*         const client = new Client({
            timeout: 0,
            basicAuthUserName: process.env.PAGARME_API_KEY,
      basicAuthPassword: "",
    });
     */
/* 
    const body = {
        planId: id_plano,
        customer: {
            name: 'Benjamin Yago Henrique Nogueira',
            email: 'benjamin-nogueira87@soespodonto.com.br',
            document: '62371483885',
            type: 'individual',
            address: clientAddress,
            metadata: {},
            phones: {
                mobilePhone: {
                    countryCode: '55',
                    number: '992473116',
                    areaCode:'11'
                }
            },
            code: 'lskr'
        },
        customerId: 'cus_37PxoxLsRi8onVA8',
        card: {
            number: '4000000000000093',
            holderName: 'Benjamin Yago Henrique Nogueira',
            expMonth: '12',
            expYear: '26',
            cvv: '123',
            type: 'credit',
            billingAddress: clientAddress,
            billingAddressId : '',

        },
        cardId: '',
        code: 'trl',
        paymentMethod: 'credit_card',
        billingType: plan?.billingType,
        statementDescriptor: plan?.statementDescriptor,
        description: plan?.description,
        currency: plan?.currency,
        intervalCount: plan?.intervalCount,
        interval: plan?.interval,
        pricingScheme: plan?.items[0]?.pricingScheme,
        items : [],
        shipping: {
            type: '',
            amount: 0,
            description: 'teste',
            recipientName: '', 
            recipientPhone: '',
            addressId: '',
            address: clientAddress
        },
        increments: [],
        discounts: [],
        metadata: {},
        boletoDueDays: 3,
        installments: 1

    } */

    const user = await Usuario.findOne({
        where: {
            id_user
        }
    })

    
    const validate = cartao?.validade?.split('/')

    const card = metodoPagamento == 'credit_card' ? {
        number: cartao?.number,
        holder_name: cartao?.holder,
        exp_month: validate[0],
        exp_year: validate[1],
        cvv: cartao?.cvv,
        type: 'credit',
    } : null

    const body = {
        plan_id: id_plano,
        customer: {
            name:`${user?.nome} ${user?.sobrenome}`,
            email: user?.email,
            
        },
        card,
        payment_method: metodoPagamento,
        increments: [],
        discounts: [],
        metadata: {},
        boleto_due_days: 3,
        installments: 1

    }

    
    const reqAssinatura = await fetch('https://api.pagar.me/core/v5/subscriptions', {
        method: 'POST',
        headers: {
            accept: 'application/json',
    'content-type': 'application/json',
    'Authorization': `Basic ${Buffer.from(process.env.PAGARME_API_KEY + ':').toString('base64')}`
        },
        body: JSON.stringify(body)
    })

    console.log('request',reqAssinatura)

    const newAssinatura = await reqAssinatura?.json()

    /* const newSubscription = await Subscription.createSubscription(body)

    console.log(newSubscription) */


    
if(newAssinatura?.status === 'active'){

    await Assinatura_User.create({
        id_user,
        id_assinatura: newAssinatura?.id,
        id_plano: newAssinatura?.plan?.id,
        id_plano_sistema 
        
    })
    
    res.status(200).json({
        success: true,
        message: 'Assinatura criada com sucesso',
        assinatura: newAssinatura
    })
} else {
    res.status(400).json({
        success: false,
        message: 'Não foi possível efetuar a transação',
        err: error
    })
}

} catch (error) {
        console.log(error)
    res.status(400).json({
        success: false,
        message: 'Houve um erro na transação',
        err: error
    })
    return
}
  }
};
