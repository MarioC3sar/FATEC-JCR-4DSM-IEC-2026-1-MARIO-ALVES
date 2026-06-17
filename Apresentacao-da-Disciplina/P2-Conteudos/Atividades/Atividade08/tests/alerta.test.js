const { classificarAlerta, enviarNotificacao } = require("../alerta");

describe("Testes Unitários - Monitoramento de Queimadas (alerta.js)", () => {
  
  describe("classificarAlerta", () => {
    test("deve retornar 'Crítico' quando o valor for maior ou igual a 90", () => {
      expect(classificarAlerta(90)).toBe("Crítico");
      expect(classificarAlerta(95)).toBe("Crítico");
    });

    test("deve retornar 'Alto' quando o valor for maior ou igual a 70 e menor que 90", () => {
      expect(classificarAlerta(70)).toBe("Alto");
      expect(classificarAlerta(85)).toBe("Alto");
    });

    test("deve retornar 'Baixo' quando o valor for menor que 70", () => {
      expect(classificarAlerta(0)).toBe("Baixo");
      expect(classificarAlerta(50)).toBe("Baixo");
      expect(classificarAlerta(69)).toBe("Baixo");
    });
  });

  describe("enviarNotificacao", () => {
    test("deve formatar corretamente a mensagem com o nível de alerta especificado", () => {
      expect(enviarNotificacao("Crítico")).toBe("Notificação enviada: Crítico");
      expect(enviarNotificacao("Alto")).toBe("Notificação enviada: Alto");
      expect(enviarNotificacao("Baixo")).toBe("Notificação enviada: Baixo");
    });
  });

});
