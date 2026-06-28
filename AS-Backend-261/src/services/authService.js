const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const database = require('../database');

const JWT_SECRET = 'segredo_bolao_copa';

async function login(email, senha) {
  if (!email || !senha) {
    return null;
  }

  const usuario = await database('usuarios').where({ email }).first();

  if (!usuario) {
    return null;
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    return null;
  }

  const token = jwt.sign(
    { id: usuario.id },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  return { token };
}

module.exports = {
  login,
  JWT_SECRET
};