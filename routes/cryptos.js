const express = require('express');
const router = express.Router();
const cryptoController = require('../controllers/cryptoController');

router.get('/prices', cryptoController.getCryptoPrices);

module.exports = router;
