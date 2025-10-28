const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('./helpers/autenticacao');

describe('Buscar pacientes', () => {
    describe('GET /api/pacientes', () => {
        let token;

        beforeEach(async () => {
            token = await obterToken('medico', '123');
        })

        it('Deve retornar a lista de pacientes', async () => {

            token = await obterToken('medico', '123');

            const resposta = await request(process.env.BASE_URL)
                .get('/api/pacientes')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.be.an('array');
        });

        it('Deve retornar status 401 quando o token não for fornecido', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/api/pacientes')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            expect(resposta.status).to.equal(200);
        });

    })

})