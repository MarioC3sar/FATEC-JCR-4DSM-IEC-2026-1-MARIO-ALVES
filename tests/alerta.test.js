const { classificarAlerta } = require("../alerta");

test("alerta alto", () => {
  expect(classificarAlerta(70)).toBe("Alto");
});

test("alerta baixo", () => {
  expect(classificarAlerta(50)).toBe("Baixo");
});
