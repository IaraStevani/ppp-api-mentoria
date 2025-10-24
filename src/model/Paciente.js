// Modelo de Paciente
class Paciente {
  constructor(id, nome, idade, imc, pressao, historico = []) {
    this.id = id;
    this.nome = nome;
    this.idade = idade;
    this.imc = imc;
    this.pressao = pressao;
    this.historico = historico; // array de HistoricoRisco
  }
}

module.exports = Paciente;