/**
 * Classifica o nível do alerta com base no valor do índice de queimada.
 * @param {number} valor - Índice de risco (0 a 100)
 * @returns {string} Nível do alerta
 */
function classificarAlerta(valor) {
  if (valor >= 90) {
    return "Crítico";
  }
  if (valor >= 70) {
    return "Alto";
  }
  return "Baixo";
}

/**
 * Simula o envio de uma notificação formatando a mensagem.
 * @param {string} alerta - Nível de alerta
 * @returns {string} Mensagem enviada
 */
function enviarNotificacao(alerta) {
  return `Notificação enviada: ${alerta}`;
}

/**
 * Processa o alerta completo a partir do valor numérico de risco.
 * @param {number} valor - Índice de risco
 * @returns {string} Resultado do processamento e notificação
 */
function processarAlerta(valor) {
  const alerta = classificarAlerta(valor);
  return enviarNotificacao(alerta);
}

module.exports = {
  classificarAlerta,
  enviarNotificacao,
  processarAlerta
};
