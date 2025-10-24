# API de Risco de Saúde

## Objetivo
API Rest para calcular o risco de um paciente desenvolver uma condição de saúde (ex: diabetes, risco cardiovascular), com base em dados de entrada (idade, IMC, pressão arterial).

## Contexto
- Registro e login de médicos e pacientes.
- Médicos podem cadastrar, buscar e atualizar pacientes, registrar dados clínicos, calcular risco e consultar histórico.
- Pacientes podem consultar apenas seu próprio histórico.
- Progressão do paciente é feita pela comparação do histórico de cálculos de risco.
- Risco ALTO: paciente idoso (>65 anos), gravemente obeso (IMC > 35) e hipertenso (≥160 mmHg sistólica).

## Autenticação
- JWT obrigatório para todas as rotas protegidas.
- Médicos têm acesso total; pacientes apenas ao próprio histórico.

## Endpoints principais
- `POST /api/registrar` — Registrar usuário (médico ou paciente)
- `POST /api/login` — Login e obtenção de token JWT
- `POST /api/pacientes` — Cadastrar paciente (médico)
- `GET /api/pacientes` — Listar pacientes (médico)
- `GET /api/pacientes/{id}` — Buscar paciente por ID (médico)
- `PUT /api/pacientes/{id}` — Atualizar dados do paciente (médico)
- `POST /api/pacientes/{id}/risco` — Calcular risco e registrar histórico (médico)
- `GET /api/historico` — Consultar histórico do paciente (paciente)
- `GET /docs` — Documentação Swagger

## Modelos principais
- **Usuário:** id, nome, senha, tipo (medico/paciente)
- **Paciente:** id, nome, idade, imc, pressao, historico
- **Histórico de Risco:** data, idade, imc, pressao, risco

## Como rodar
1. Instale as dependências:
   ```bash
   npm install express jsonwebtoken swagger-ui-express
   ```
2. Inicie a API:
   ```bash
   node app.js
   ```
3. Acesse a documentação em [http://localhost:3000/docs](http://localhost:3000/docs)

## Observações
- O banco de dados é em memória (os dados são perdidos ao reiniciar).
- Senha padrão para pacientes é `123456`.
- Veja exemplos de requisições e respostas na documentação Swagger.
