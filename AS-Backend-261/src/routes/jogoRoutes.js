const express = require('express');
const jogoController = require('../controllers/jogoController');

const router = express.Router();

router.get('/jogos', jogoController.listarJogos);

module.exports = router;