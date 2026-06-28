const palpiteService = require('../services/palpiteService');

async function criarPalpite(req, res) {
  try {
    const palpite = await palpiteService.criarPalpite(req.usuarioId, req.body);

    return res.status(201).json(palpite);
  } catch (error) {
    return res.status(error.status || 500).json({
      mensagem: error.message || 'Erro ao criar palpite'
    });
  }
}

async function listarPalpites(req, res) {
  try {
    const palpites = await palpiteService.listarPalpites(req.usuarioId);

    return res.json(palpites);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao listar palpites' });
  }
}

async function atualizarPalpite(req, res) {
  try {
    const { id } = req.params;

    const palpite = await palpiteService.atualizarPalpite(id, req.usuarioId, req.body);

    return res.json(palpite);
  } catch (error) {
    return res.status(error.status || 500).json({
      mensagem: error.message || 'Erro ao atualizar palpite'
    });
  }
}

async function deletarPalpite(req, res) {
  try {
    const { id } = req.params;

    const resultado = await palpiteService.deletarPalpite(id, req.usuarioId);

    return res.json(resultado);
  } catch (error) {
    return res.status(error.status || 500).json({
      mensagem: error.message || 'Erro ao deletar palpite'
    });
  }
}

module.exports = {
  criarPalpite,
  listarPalpites,
  atualizarPalpite,
  deletarPalpite
};