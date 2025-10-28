const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const postLogin = require('./fixtures/postLogin.json');

describe('Login', () => {
    describe('Post/login', () => {
        it('Deve retornar status 200 com um token em string quando usar credenciais válidas', async () => {

            const bodyLogin = { ...postLogin };

            const resposta = await request(process.env.BASE_URL)
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a('string');
        })

        it('Deve retornar status 401 quando usar credenciais inválidas', async () => {

            const bodyLogin = { ...postLogin };
            bodyLogin.senha = 'senha_incorreta';

            const resposta = await request(process.env.BASE_URL)
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            expect(resposta.status).to.equal(401);
        })

    })
})