const express = require('express');
const router = express.Router();

const pixController = require('../controllers/payment/br/PixController');
const creditCardController = require('../controllers/payment/br/CreditCardController');
const debitCardController = require('../controllers/payment/br/DebitCardController');
const boletoController = require('../controllers/payment/br/BoletoController');

router.post('/pix', pixController.processPayment);
router.post('/credit-card', creditCardController.processPayment);
router.post('/debit-card', debitCardController.processPayment);
router.post('/boleto', boletoController.processPayment);

module.exports = router;
