const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createPayment = async (req, res) => {
  const { amount, currency, paymentMethod, referenceType } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethod,
      description: 'Exemplo de pagamento',
      metadata: {
        reference_type: referenceType,
      },
    });

    const paymentInfo = getPaymentInfo(paymentIntent);

    res.json(paymentInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCardPayment = async (req, res) => {
  const { amount, currency, cardNumber, expMonth, expYear, cvc } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
      payment_method_data: {
        type: 'card',
        card: {
          number: cardNumber,
          exp_month: expMonth,
          exp_year: expYear,
          cvc,
        },
      },
      description: 'Exemplo de pagamento com cartão de crédito',
    });

    const paymentInfo = getPaymentInfo(paymentIntent);

    res.json(paymentInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function getPaymentInfo(paymentIntent) {
  const paymentInfo = {
    client_secret: paymentIntent.client_secret,
    currency: paymentIntent.currency.toUpperCase(),
    amount: paymentIntent.amount / 100,
    reference: '',
  };

  if (paymentIntent.metadata.reference_type === 'multibanco') {
    paymentInfo.reference = generateMultibancoReference();
  }

  if (paymentIntent.metadata.reference_type === 'mbway') {
    paymentInfo.reference = generateMbWayReference();
  }

  return paymentInfo;
}


function generateMultibancoReference() {
  const reference = generateRandomNumber(9); // Referência Multibanco (9 dígitos)

  return reference;
}

function generateMbWayReference() {
  const reference = generateRandomNumber(9); // Referência MbWay (9 dígitos)

  return reference;
}

function generateRandomNumber(length) {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
