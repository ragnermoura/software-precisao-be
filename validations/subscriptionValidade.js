const yup = require('yup')


const SubscriptionValidate = yup.object().shape({
    id_plano: yup.string()
    .min(5, 'O numero mínimo para o carácter do id é 5')
    .required('O id do plano é um campo obrigatório'),
    metodoPagamento: yup.string().required('O método de pagamento é obrigatório').oneOf([
        'credit_card',
        'boleto',
        'debit_card'
    ], 'Você deve colocar o método de pagamento entre boleto, credit_card e debit_card')
})

module.exports = {
    SubscriptionValidate
}