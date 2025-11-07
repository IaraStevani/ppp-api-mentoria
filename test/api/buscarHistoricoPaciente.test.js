const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('./helpers/autenticacao');
const { obterTokenPaciente } = require('./helpers/autenticacaoPaciente');

describe('Buscar histórico do paciente', () => {
    describe('GET /api/historico', () => {
        let token;

        beforeEach(async () => {
            token = await obterTokenPaciente('paciente', '123');
        })

        it('Deve retornar o historico do paciente', async () => {            

            const resposta = await request(process.env.BASE_URL)
                .get('/api/historico')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.be.an('array');
        });
    })
})