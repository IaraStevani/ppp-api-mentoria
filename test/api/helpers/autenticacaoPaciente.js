const request = require('supertest');
const postLoginPaciente = require('../fixtures/postLoginPaciente.json');

const obterTokenPaciente = async (usuario, senha) => {

    const bodyLogin = { ...postLoginPaciente };

    const respostaLogin = await request(process.env.BASE_URL)
        .post('/api/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin)

    return respostaLogin.body.token
}

module.exports = {
    obterTokenPaciente
};