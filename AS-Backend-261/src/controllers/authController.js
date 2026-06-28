const authService = require('../services/authService');

async function login(req, res) {
  try {
    const { email, senha } = req.body;

    const resultado = await authService.login(email, senha);

    if (!resultado) {
      return res.status(401).json({ mensagem: 'Email ou senha inválidos' });
    }

    return res.json(resultado);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao realizar login' });
  }
}

module.exports = {
  login
};