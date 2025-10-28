const request = require('supertest');
const { expect } = require('chai');
const { obterToken } = require('./helpers/autenticacao');
require('dotenv').config();
const postRegistrarPacientes = require('./fixtures/postRegistrarPacientes.json');

describe('Registrar Paciente', () => {
    describe('POST /api/pacientes', () => {
        let token;

        beforeEach(async () => {
            token = await obterToken('medico', '123');
        })

        it('Deve retornar status 201 quando o paciente for criado com sucesso', async () => {

            const bodyRegistrarPacientes = { ...postRegistrarPacientes };

            token = await obterToken('medico', '123');

            const resposta = await request(process.env.BASE_URL)
                .post('/api/pacientes')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyRegistrarPacientes)

            expect(resposta.status).to.equal(201);
        })

        it('Deve retornar status 400 quando o paciente for criado com dados inválidos', async () => {

            const bodyRegistrarPacientes = { ...postRegistrarPacientes };
            bodyRegistrarPacientes.nome = ''; 

            token = await obterToken('medico', '123');

            const resposta = await request(process.env.BASE_URL)
                .post('/api/pacientes')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyRegistrarPacientes)

            expect(resposta.status).to.equal(400);
        })
        it('Deve retornar status 401 quando o token não for fornecido', async () => {

            const bodyRegistrarPacientes = { ...postRegistrarPacientes };

            const resposta = await request(process.env.BASE_URL)
                .post('/api/pacientes')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyRegistrarPacientes)

            expect(resposta.status).to.equal(201);
        });
    })
})