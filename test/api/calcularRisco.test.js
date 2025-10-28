const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('./helpers/autenticacao');

describe('Calcular Risco', () => {
    describe('POST /api/pacientes/:id/risco', () => {
        let token;

        beforeEach(async () => {
            token = await obterToken('medico', '123');
        })

        it('Deve retornar status 200 e calcular risco ALTO para paciente com idade > 65, IMC > 35 e pressão >= 160', async () => {
            // Login como médico
            token = await obterToken('medico', '123');

            // Registrar paciente com dados que resultam em risco ALTO
            const respostaPaciente = await request(process.env.BASE_URL)
                .post('/api/pacientes')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'nome': 'Paciente Alto Risco',
                    'idade': 70,
                    'imc': 40,
                    'pressao': 160
                });

            const pacienteId = respostaPaciente.body.id;

            // Calcular risco
            const resposta = await request(process.env.BASE_URL)
                .post(`/api/pacientes/${pacienteId}/risco`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.have.property('risco', 'ALTO');
            expect(resposta.body).to.have.property('idade', 70);
            expect(resposta.body).to.have.property('imc', 40);
            expect(resposta.body).to.have.property('pressao', 160);
            expect(resposta.body).to.have.property('data').that.is.a('string');
        });

        it('Deve retornar status 200 e calcular risco MODERADO', async () => {
            // Login como médico
            token = await obterToken('medico', '123');

            // Registrar paciente com dados que resultam em risco MODERADO
            const respostaPaciente = await request(process.env.BASE_URL)
                .post('/api/pacientes')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'nome': 'Paciente Risco Moderado',
                    'idade': 55,
                    'imc': 28,
                    'pressao': 140
                });

            const pacienteId = respostaPaciente.body.id;

            // Calcular risco
            const resposta = await request(process.env.BASE_URL)
                .post(`/api/pacientes/${pacienteId}/risco`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.have.property('risco', 'MODERADO');
            expect(resposta.body).to.have.property('idade', 55);
            expect(resposta.body).to.have.property('imc', 28);
            expect(resposta.body).to.have.property('pressao', 140);
        });


        it('Deve retornar status 200 e calcular risco BAIXO para paciente com todos os valores baixos', async () => {
            // Login como médico
            token = await obterToken('medico', '123');

            // Registrar paciente com dados que resultam em risco BAIXO
            const respostaPaciente = await request(process.env.BASE_URL)
                .post('/api/pacientes')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'nome': 'Paciente Baixo Risco',
                    'idade': 25,
                    'imc': 22,
                    'pressao': 110
                });

            const pacienteId = respostaPaciente.body.id;

            // Calcular risco
            const resposta = await request(process.env.BASE_URL)
                .post(`/api/pacientes/${pacienteId}/risco`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.have.property('risco', 'BAIXO');
            expect(resposta.body).to.have.property('idade', 25);
            expect(resposta.body).to.have.property('imc', 22);
            expect(resposta.body).to.have.property('pressao', 110);
        });

        it('Deve retornar status 404 quando o paciente não existir', async () => {
            // Login como médico
            token = await obterToken('medico', '123');

            const pacienteIdInexistente = 99999;

            // Tentar calcular risco para paciente inexistente
            const resposta = await request(process.env.BASE_URL)
                .post(`/api/pacientes/${pacienteIdInexistente}/risco`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            expect(resposta.status).to.equal(404);
            expect(resposta.body).to.have.property('erro', 'Paciente não encontrado');
        });

        it('Deve retornar status 401 quando não fornecer token de autenticação', async () => {
            // Tentar calcular risco sem token
            const resposta = await request(process.env.BASE_URL)
                .post('/api/pacientes/1/risco')
                .set('Content-Type', 'application/json')
                .send();

            expect(resposta.status).to.equal(401);
        });

        it('Deve retornar status 403 quando tentar acessar com token de paciente', async () => {
            // Primeiro registrar um paciente
            const respostaLogin = await request(process.env.BASE_URL)
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send({
                    'nome': 'medico',
                    'senha': '123'
                });

            const tokenMedico = respostaLogin.body.token;

            const respostaPaciente = await request(process.env.BASE_URL)
                .post('/api/pacientes')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${tokenMedico}`)
                .send({
                    'nome': 'Paciente Teste',
                    'idade': 30,
                    'imc': 25,
                    'pressao': 120
                });

            // Login como paciente
            const respostaLoginPaciente = await request(process.env.BASE_URL)
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send({
                    'nome': 'Paciente Teste',
                    'senha': '123456'
                });

            const tokenPaciente = respostaLoginPaciente.body.token;
            const pacienteId = respostaPaciente.body.id;

            // Tentar calcular risco com token de paciente
            const resposta = await request(process.env.BASE_URL)
                .post(`/api/pacientes/${pacienteId}/risco`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${tokenPaciente}`)
                .send();

            expect(resposta.status).to.equal(403);
        });

        it('Deve adicionar o histórico ao paciente após calcular o risco', async () => {
            // Login como médico
            token = await obterToken('medico', '123');

            // Registrar paciente
            const respostaPaciente = await request(process.env.BASE_URL)
                .post('/api/pacientes')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'nome': 'Paciente Histórico',
                    'idade': 45,
                    'imc': 28,
                    'pressao': 130
                });

            const pacienteId = respostaPaciente.body.id;

            // Calcular risco
            await request(process.env.BASE_URL)
                .post(`/api/pacientes/${pacienteId}/risco`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            // Verificar se o paciente tem histórico
            const respostaPacienteAtualizado = await request(process.env.BASE_URL)
                .get(`/api/pacientes/${pacienteId}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            expect(respostaPacienteAtualizado.status).to.equal(200);
            expect(respostaPacienteAtualizado.body).to.have.property('historico');
            expect(respostaPacienteAtualizado.body.historico).to.be.an('array');           
            expect(respostaPacienteAtualizado.body.historico[0]).to.have.property('risco', 'BAIXO');
        });
    });
});