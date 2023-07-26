const plan = require('./plan')
const subscription = require('./subscription')
const login = require('./login')
const user = require('./usuario')
const router = require("express").Router();

router.use('/plan', plan)
router.use('/subscription', subscription)
router.use('/usuario', user)
router.use('/login', login)
module.exports = router