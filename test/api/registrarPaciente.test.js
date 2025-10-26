const request = require('supertest');
const { expect } = require('chai');

describe('Registrar Paciente', () => {
    describe('POST /api/pacientes', () => {
        it('Deve retornar status 201 quando o paciente for criado com sucesso', async () => {
            const respostaLogin = await request('http://localhost:3000')
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send({
                    'nome': 'medico',
                    'senha': '123'
                })
            
            const token = respostaLogin.body.token

            const resposta = await request('http://localhost:3000')
                .post('/api/pacientes')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'nome': 'paciente',
                    'idade': 70,
                    'imc': 40,
                    'pressao': 160
                })
            
            expect(resposta.status).to.equal(201);
        })

        it('Deve retornar status 400 quando o paciente for criado com dados inválidos', async () => {
            const respostaLogin = await request('http://localhost:3000')
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send({
                    'nome': 'medico',
                    'senha': '123'
                })
            
            const token = respostaLogin.body.token

            const resposta = await request('http://localhost:3000')
                .post('/api/pacientes')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'nome': '',
                    'idade': -5,
                    'imc': 'invalid',
                    'pressao': null
                })
            
            expect(resposta.status).to.equal(400);
        })
    })
})