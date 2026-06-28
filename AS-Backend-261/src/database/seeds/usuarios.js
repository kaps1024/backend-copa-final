const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  await knex('palpites').del();
  await knex('usuarios').del();

  const senha = await bcrypt.hash('123456', 10);

  await knex('usuarios').insert([
    {
      nome: 'Yasmim',
      email: 'yasmim@email.com',
      senha
    },
    {
      nome: 'Karina',
      email: 'karina@email.com',
      senha
    }
  ]);
};