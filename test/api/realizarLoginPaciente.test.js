const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const postLoginPaciente = require('./fixtures/postLoginPaciente.json');

describe('Login Paciente',()=>{
     describe('Post/login', () => {
        it('Deve retornar status 200 com um token em string quando usar credenciais válidas', async () => {

            const bodyLogin = { ...postLoginPaciente };

            const resposta = await request(process.env.BASE_URL)
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)
            
            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a('string');
        })

        it('Deve retornar status 401 quando usar credenciais inválidas', async () => {

            const bodyLogin = { ...postLoginPaciente };
            bodyLogin.senha = 'senha_incorreta';

            const resposta = await request(process.env.BASE_URL)
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            expect(resposta.status).to.equal(401);
        })
    })
})