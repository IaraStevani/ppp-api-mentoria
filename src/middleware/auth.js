const jwt = require('jsonwebtoken');

const SECRET = 'segredo_super_secreto';

// Middleware de autenticação JWT
function autenticarJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ erro: 'Token inválido' });
  }
  jwt.verify(token, SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({ erro: 'Token inválido ou expirado' });
    }
    req.usuario = usuario;
    next();
  });
}

// Middleware para checar se é médico
function somenteMedico(req, res, next) {
  if (req.usuario && req.usuario.tipo === 'medico') {
    return next();
  }
  return res.status(403).json({ erro: 'Acesso restrito a médicos' });
}

// Middleware para checar se é paciente
function somentePaciente(req, res, next) {
  if (req.usuario && req.usuario.tipo === 'paciente') {
    return next();
  }
  return res.status(403).json({ erro: 'Acesso restrito a pacientes' });
}

module.exports = {
  autenticarJWT,
  somenteMedico,
  somentePaciente,
  SECRET
};
