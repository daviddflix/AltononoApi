const express = require('express')
const router = express.Router()

const paymentLink = require('../controllers/paymentLink')

router.post('/paymentlink', paymentLink)

module.exports = router