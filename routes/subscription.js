const express = require('express');
const SubscriptionController = require('../controllers/subscription/subscriptionController');
const validate = require('../middlewares/validate');
const { SubscriptionValidate } = require('../validations/subscriptionValidade');
const router = express.Router();

router.post('/create', (req, res, next) => {validate(SubscriptionValidate, req, res, next);},SubscriptionController.CreateSubscription)

module.exports = router