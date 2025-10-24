// Modelo de Histórico de Risco
class HistoricoRisco {
  constructor(data, idade, imc, pressao, risco) {
    this.data = data;
    this.idade = idade;
    this.imc = imc;
    this.pressao = pressao;
    this.risco = risco; // 'ALTO', 'MODERADO', 'BAIXO'
  }
}

module.exports = HistoricoRisco;