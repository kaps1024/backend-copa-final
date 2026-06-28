const express = require('express');
const palpiteController = require('../controllers/palpiteController');
const autenticar = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/palpites', autenticar, palpiteController.criarPalpite);
router.get('/palpites', autenticar, palpiteController.listarPalpites);
router.put('/palpites/:id', autenticar, palpiteController.atualizarPalpite);
router.delete('/palpites/:id', autenticar, palpiteController.deletarPalpite);

module.exports = router;