const express = require("express");
const stripeController = require('./stripeController');
const router = express.Router();
const mysql = require("../mysql").pool;

require("dotenv").config();

router.post('/payment-simple', stripeController.createPayment);
router.post('/card-payment', stripeController.createCardPayment);

module.exports = router;