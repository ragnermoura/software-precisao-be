const pagarMe = require('pagarme');
require("dotenv").config();

// Defina o controlador para o PIX
const PixController = {
  processPayment: async (req, res) => {
    try {
      // Aqui você pode acessar os dados da requisição, como o valor do pagamento e informações do cliente

      // Configuração do Pagar.me com as credenciais do .env
      const pagarmeClient = await pagarMe.client.connect({
        api_key: process.env.PAGARME_API_KEY,
      });

      // Crie uma transação de PIX
      const pixTransaction = await pagarmeClient.transactions.create({
        amount: req.body.amount, // Valor do pagamento
        payment_method: 'pix',
        pix_expiration_date: '2023-12-31', // Data de expiração do PIX
        customer: {
          external_id: '1', // ID do cliente na sua aplicação
          name: 'John Doe', // Nome do cliente
          type: 'individual',
          country: 'br',
          email: 'john.doe@example.com', // E-mail do cliente
          documents: [
            {
              type: 'cpf',
              number: '12345678900', // CPF do cliente
            },
          ],
          phone_numbers: ['+5511999999999'], // Número de telefone do cliente
        },
        async_payment: true, // Define se a transação deve ser processada de forma assíncrona
      });

      // Aqui você pode fazer o tratamento dos resultados da transação e retornar a resposta adequada para a requisição

      // Exemplo de resposta de sucesso
      return res.status(200).json({
        message: 'Pagamento via PIX processado com sucesso',
        transactionId: pixTransaction.id,
      });
    } catch (error) {
      // Tratamento de erros
      console.error('Erro ao processar pagamento via PIX:', error);
      return res.status(500).json({ error: 'Erro ao processar pagamento via PIX' });
    }
  },
};

module.exports = PixController;