// Modelo de Usuário para autenticação
class Usuario {
  constructor(id, nome, senha, tipo) {
    this.id = id;
    this.nome = nome;
    this.senha = senha;
    this.tipo = tipo; // 'medico' ou 'paciente'
  }
}

module.exports = Usuario;