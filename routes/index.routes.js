const plan = require('./plan')
const subscription = require('./subscription')
const login = require('./login')
const router = require("express").Router();

router.use('/plan', plan)
router.use('/subscription', subscription)
router.use('/usuario')
router.use('/login', login)
module.exports = router