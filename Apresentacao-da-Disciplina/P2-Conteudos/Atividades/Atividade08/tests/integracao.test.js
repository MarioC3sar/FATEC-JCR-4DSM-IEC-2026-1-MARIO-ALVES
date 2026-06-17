const { processarAlerta } = require("../alerta");

describe("Testes de Integração - Fluxo Completo de Alertas", () => {
  
  test("deve processar o alerta completo como 'Crítico' para valor de risco 95", () => {
    const resultado = processarAlerta(95);
    expect(resultado).toBe("Notificação enviada: Crítico");
  });

  test("deve processar o alerta completo como 'Alto' para valor de risco 75", () => {
    const resultado = processarAlerta(75);
    expect(resultado).toBe("Notificação enviada: Alto");
  });

  test("deve processar o alerta completo como 'Baixo' para valor de risco 40", () => {
    const resultado = processarAlerta(40);
    expect(resultado).toBe("Notificação enviada: Baixo");
  });

});
