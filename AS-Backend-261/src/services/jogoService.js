const axios = require('axios');

async function listarJogos() {
  const resposta = await axios.get('http://localhost:3333/games');

  return resposta.data.map((jogo) => ({
    data: jogo.date,
    etapa: jogo.step,
    grupo: jogo.group,
    estadio: jogo.stadium,
    time_casa: jogo.homeTeam ? jogo.homeTeam.name : null,
    time_fora: jogo.outsideTeam ? jogo.outsideTeam.name : null
  }));
}

module.exports = {
  listarJogos
};