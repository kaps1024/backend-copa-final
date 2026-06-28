const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../services/authService');

function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Token não informado' });
  }

  const partes = authHeader.split(' ');

  if (partes.length !== 2) {
    return res.status(401).json({ mensagem: 'Token inválido' });
  }

  const [tipo, token] = partes;

  if (tipo !== 'Bearer') {
    return res.status(401).json({ mensagem: 'Token inválido' });
  }

  try {
    const dados = jwt.verify(token, JWT_SECRET);

    req.usuarioId = dados.id;

    return next();
  } catch (error) {
    return res.status(401).json({ mensagem: 'Token inválido' });
  }
}

module.exports = autenticar;