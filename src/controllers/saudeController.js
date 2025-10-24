const saudeService = require('../service/saudeService');

// Registro de usuário (médico ou paciente)
function registrarUsuario(req, res) {
  const { nome, senha, tipo } = req.body;
  if (!nome || !senha || !tipo) {
    return res.status(400).json({ erro: 'Nome, senha e tipo são obrigatórios' });
  }
  const usuario = saudeService.registrarUsuario({ nome, senha, tipo });
  res.status(201).json(usuario);
}

// Login
function login(req, res) {
  const { nome, senha } = req.body;
  const result = saudeService.autenticarUsuario({ nome, senha });
  if (!result) {
    return res.status(401).json({ erro: 'Usuário ou senha inválidos' });
  }
  res.json(result);
}

// Cadastro de paciente
function registrarPaciente(req, res) {
  const { nome, idade, imc, pressao } = req.body;
  if (!nome || idade === undefined || imc === undefined || pressao === undefined) {
    return res.status(400).json({ erro: 'Nome, idade, IMC e pressão são obrigatórios' });
  }
  const paciente = saudeService.registrarPaciente({ nome, idade, imc, pressao });
  res.status(201).json(paciente);
}

// Buscar pacientes
function buscarPacientes(req, res) {
  res.json(saudeService.buscarPacientes());
}

// Buscar paciente por ID
function buscarPacientePorId(req, res) {
  const paciente = saudeService.buscarPacientePorId(req.params.id);
  if (!paciente) return res.status(404).json({ erro: 'Paciente não encontrado' });
  res.json(paciente);
}

// Atualizar dados do paciente
function atualizarPaciente(req, res) {
  const paciente = saudeService.atualizarPaciente(req.params.id, req.body);
  if (!paciente) return res.status(404).json({ erro: 'Paciente não encontrado' });
  res.json(paciente);
}

// Calcular risco e registrar histórico
function calcularRisco(req, res) {
  const historico = saudeService.registrarHistoricoRisco(req.params.id);
  if (!historico) return res.status(404).json({ erro: 'Paciente não encontrado' });
  res.json(historico);
}

// Buscar histórico do paciente
function buscarHistorico(req, res) {
  const historico = saudeService.buscarHistorico(req.params.id);
  if (!historico) return res.status(404).json({ erro: 'Paciente não encontrado' });
  res.json(historico);
}

module.exports = {
  registrarUsuario,
  login,
  registrarPaciente,
  buscarPacientes,
  buscarPacientePorId,
  atualizarPaciente,
  calcularRisco,
  buscarHistorico
};
