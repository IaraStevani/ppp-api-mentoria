const Paciente = require('../model/Paciente');
const Medico = require('../model/Medico');
const Usuario = require('../model/Usuario');
const HistoricoRisco = require('../model/HistoricoRisco');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../middleware/auth');

// Banco de dados em memória
const db = {
  usuarios: [
    {
    id: 1,
    nome: 'medico',
    senha: '123',
    tipo: 'medico'
  },
  {
    id: 2,
    nome: 'paciente',
    senha: '123',
    tipo: 'paciente'
  }
  ], // médicos e pacientes
  pacientes: [{id:2,nome:'paciente',idade:70,imc:40,pressao:160,historico:[]}],
  medicos: [{id:1,nome: 'medico',senha:'123'}]
};

// Função para registrar usuário (médico ou paciente)
function registrarUsuario({ nome, senha, tipo }) {
  const id = db.usuarios.length + 1;
  const usuario = new Usuario(id, nome, senha, tipo);
  db.usuarios.push(usuario);
  if (tipo === 'medico') db.medicos.push(new Medico(id, nome, senha));
  return usuario;
}

// Função para autenticar usuário
function autenticarUsuario({ nome, senha }) {
  const usuario = db.usuarios.find(u => u.nome === nome && u.senha === senha);
  if (!usuario) return null;
  const token = jwt.sign({ id: usuario.id, nome: usuario.nome, tipo: usuario.tipo }, SECRET, { expiresIn: '2h' });
  return { token, tipo: usuario.tipo };
}

// Função para registrar paciente
function registrarPaciente({ nome, idade, imc, pressao }) {
  const id = db.pacientes.length + 1;
  const paciente = new Paciente(id, nome, idade, imc, pressao, []);
  db.pacientes.push(paciente);
  registrarUsuario({ nome, senha: '123', tipo: 'paciente' }); // senha padrão
  return paciente;
}

// Buscar pacientes
function buscarPacientes() {
  return db.pacientes;
}

// Buscar paciente por ID
function buscarPacientePorId(id) {
  return db.pacientes.find(p => p.id === Number(id));
}

// Registrar idade, IMC ou pressão arterial
function atualizarPaciente(id, { idade, imc, pressao }) {
  const paciente = buscarPacientePorId(id);
  if (!paciente) return null;
  if (idade !== undefined) paciente.idade = idade;
  if (imc !== undefined) paciente.imc = imc;
  if (pressao !== undefined) paciente.pressao = pressao;
  return paciente;
}

// Calcular risco
function calcularRisco(paciente) {
  let risco = 'BAIXO';
  if (
    paciente.idade > 65 &&
    paciente.imc > 35 &&
    paciente.pressao >= 160
  ) {
    risco = 'ALTO';
  } else if (
    paciente.idade > 50 ||
    paciente.imc > 30 ||
    paciente.pressao >= 140
  ) {
    risco = 'MODERADO';
  }
  return risco;
}

// Registrar cálculo de risco no histórico
function registrarHistoricoRisco(id) {
  const paciente = buscarPacientePorId(id);
  if (!paciente) return null;
  const risco = calcularRisco(paciente);
  const historico = new HistoricoRisco(new Date().toISOString(), paciente.idade, paciente.imc, paciente.pressao, risco);
  paciente.historico.push(historico);
  return historico;
}

// Buscar histórico do paciente
function buscarHistorico(id) {
  const paciente = buscarPacientePorId(id);
  if (!paciente) return null;
  return paciente.historico;
}

module.exports = {
  db,
  registrarUsuario,
  autenticarUsuario,
  registrarPaciente,
  buscarPacientes,
  buscarPacientePorId,
  atualizarPaciente,
  calcularRisco,
  registrarHistoricoRisco,
  buscarHistorico
};
