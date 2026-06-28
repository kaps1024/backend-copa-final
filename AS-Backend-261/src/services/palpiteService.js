const axios = require('axios');
const database = require('../database');

async function criarPalpite(usuarioId, dados) {
  const { time_a, time_b, gols_a, gols_b, data_jogo } = dados;

  if (gols_a < 0 || gols_b < 0) {
    const erro = new Error('Os gols não podem ser negativos');
    erro.status = 400;
    throw erro;
  }

  if (!time_a || !time_b || gols_a === undefined || gols_b === undefined || !data_jogo) {
    const erro = new Error('Dados obrigatórios não informados');
    erro.status = 400;
    throw erro;
  }

  const ano = data_jogo.substring(0, 4);

  const [respostaDolar, respostaFeriados] = await Promise.all([
    axios.get('https://economia.awesomeapi.com.br/json/last/USD-BRL'),
    axios.get(`https://brasilapi.com.br/api/feriados/v1/${ano}`)
  ]);

  const dolarNoDia = respostaDolar.data.USDBRL.bid;
  const feriados = respostaFeriados.data;
  const diaDeFeriado = feriados.some((feriado) => feriado.date === data_jogo);

  const jogo = `${time_a} x ${time_b}`;

  const [id] = await database('palpites').insert({
    usuario_id: usuarioId,
    jogo,
    gols_a,
    gols_b,
    data_jogo,
    dolar_no_dia: dolarNoDia,
    dia_de_feriado: diaDeFeriado
  });

  return database('palpites').where({ id }).first();
}

async function listarPalpites(usuarioId) {
  return database('palpites').where({ usuario_id: usuarioId });
}

async function atualizarPalpite(id, usuarioId, dados) {
  const { gols_a, gols_b } = dados;

  if (gols_a < 0 || gols_b < 0) {
    const erro = new Error('Os gols não podem ser negativos');
    erro.status = 400;
    throw erro;
  }

  const palpite = await database('palpites').where({ id }).first();

  if (!palpite) {
    const erro = new Error('Palpite não encontrado');
    erro.status = 404;
    throw erro;
  }

  if (palpite.usuario_id !== usuarioId) {
    const erro = new Error('Você não tem permissão para alterar este palpite');
    erro.status = 403;
    throw erro;
  }

  await database('palpites').where({ id }).update({
    gols_a,
    gols_b
  });

  return database('palpites').where({ id }).first();
}

async function deletarPalpite(id, usuarioId) {
  const palpite = await database('palpites').where({ id }).first();

  if (!palpite) {
    const erro = new Error('Palpite não encontrado');
    erro.status = 404;
    throw erro;
  }

  if (palpite.usuario_id !== usuarioId) {
    const erro = new Error('Você não tem permissão para deletar este palpite');
    erro.status = 403;
    throw erro;
  }

  await database('palpites').where({ id }).delete();

  return { mensagem: 'Palpite deletado com sucesso' };
}

module.exports = {
  criarPalpite,
  listarPalpites,
  atualizarPalpite,
  deletarPalpite
};