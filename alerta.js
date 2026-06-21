function classificarAlerta(valor) {
  if (valor >= 90) {
    return "Crítico";
  }
  if (valor >= 70) {
    return "Alto";
  }
  return "Baixo";
}

function enviarNotificacao(alerta) {
  return `Notificação enviada: ${alerta}`;
}

function processarAlerta(valor) {
  const alerta = classificarAlerta(valor);
  return enviarNotificacao(alerta);
}

module.exports = {
  classificarAlerta,
  enviarNotificacao,
  processarAlerta
};
