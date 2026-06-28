const jogoService = require('../services/jogoService');

async function listarJogos(req, res) {
  try {
    const jogos = await jogoService.listarJogos();

    return res.json(jogos);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao listar jogos' });
  }
}

module.exports = {
  listarJogos
};