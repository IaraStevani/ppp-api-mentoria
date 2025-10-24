const express = require('express');
const router = express.Router();
const saudeController = require('../controllers/saudeController');
const { autenticarJWT, somenteMedico, somentePaciente } = require('../middleware/auth');

// Registro e login
router.post('/registrar', saudeController.registrarUsuario); // qualquer um
router.post('/login', saudeController.login); // qualquer um

// Cadastro de paciente (apenas médico)
router.post('/pacientes', autenticarJWT, somenteMedico, saudeController.registrarPaciente);
// Buscar pacientes (apenas médico)
router.get('/pacientes', autenticarJWT, somenteMedico, saudeController.buscarPacientes);
// Buscar paciente por ID (apenas médico)
router.get('/pacientes/:id', autenticarJWT, somenteMedico, saudeController.buscarPacientePorId);
// Atualizar dados do paciente (apenas médico)
router.put('/pacientes/:id', autenticarJWT, somenteMedico, saudeController.atualizarPaciente);
// Calcular risco e registrar histórico (apenas médico)
router.post('/pacientes/:id/risco', autenticarJWT, somenteMedico, saudeController.calcularRisco);

// Histórico do paciente (apenas paciente)
router.get('/historico', autenticarJWT, somentePaciente, (req, res) => {
  // O paciente só pode ver seu próprio histórico
  const usuarioId = req.usuario.id;
  const historico = saudeController.buscarHistorico({ params: { id: usuarioId } }, res);
  // A resposta já é enviada pelo controller
});

module.exports = router;
