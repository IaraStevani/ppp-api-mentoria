const request = require('supertest');
const { expect } = require('chai');

describe('Buscar pacientes', () => {
    describe('GET /api/pacientes', () => {
        it('Deve retornar a lista de pacientes', async () => {
            const respostaLogin = await request('http://localhost:3000')
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send({
                    'nome': 'medico',
                    'senha': '123'
                })

            const token = respostaLogin.body.token

            const resposta = await request('http://localhost:3000')
                .get('/api/pacientes')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            console.log(resposta.body);
            console.log(resposta.status);
            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.be.an('array');
        });

    })

})