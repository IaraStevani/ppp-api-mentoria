const request = require('supertest');
const { expect } = require('chai');

describe('Login', () => {
    describe('Post/login', () => {
        it('Deve retornar status 200 com um token em string quando usar credenciais válidas', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send({
                    'nome': 'medico',
                    'senha': '123'
                })

            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a('string');
            
        })

        it('Deve retornar status 401 quando usar credenciais inválidas', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send({
                    'nome': 'usuario_invalido',
                    'senha': 'senha_incorreta'
                })

            expect(resposta.status).to.equal(401);
            
        })

    })
})