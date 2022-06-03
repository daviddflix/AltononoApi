const express = require('express')
const router = express.Router()

const details = require('../controllers/details')

router.post('/details', details)

module.exports = router