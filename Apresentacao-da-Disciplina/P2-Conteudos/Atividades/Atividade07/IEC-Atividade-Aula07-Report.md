# Atividade Aula 07: Integração e Entrega Contínua
**Curso:** Desenvolvimento de Software Multiplataforma (DSM)  
**Disciplina:** Integração e Entrega Contínua  
**Professora:** Lucineide  
**Semestre:** 1º Semestre/2026  

---

## Sumário dos Exercícios Realizados

Este relatório documenta a realização das atividades e testes de integração desenvolvidos com **Jest** e a configuração de segurança do pipeline via **GitHub Actions**.

---

### Exercício 1: Teste de Integração de Processamento Completo
Criamos o arquivo `processamento.test.js` para testar a integração da classificação de alertas com o envio de notificações.

**Código Fonte (`alerta.js`):**
```javascript
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
```

**Teste de Integração (`processamento.test.js`):**
```javascript
const { processarAlerta } = require("./alerta");

test("processamento completo de alerta crítico", () => {
  const resultado = processarAlerta(90);
  expect(resultado).toBe("Notificação enviada: Crítico");
});
```

---

### Exercício 2: Simulação com Mock de Função Externa (Jest)
Criamos um teste utilizando `jest.fn` para simular uma resposta de API externa.

**Teste do Mock (`mock.test.js`):**
```javascript
const api = { enviar: jest.fn(() => "Simulado!") };

test("simulação de envio", () => {
  const resposta = api.enviar();
  expect(resposta).toBe("Simulado!");
});
```

---

### Exercício 3: Auditoria de Segurança
Executamos o comando de verificação de vulnerabilidades nas dependências.

**Comando:**
```bash
npm audit
```

**Resultado:**
O auditor identificou 17 vulnerabilidades de severidade moderada vinculadas a dependências internas do próprio Jest (pacote `js-yaml` depreciado).
Tentou-se corrigir executando `npm audit fix`, porém as correções exigiam `--force` resultando em downgrade do Jest para versão legado (o que foi evitado para manter a compatibilidade das funcionalidades modernas de teste).

---

### Exercício 4: Workflow do GitHub Actions para Segurança
Criamos o arquivo `.github/workflows/security.yml` para automatizar a verificação de segurança a cada push e PR nas branches principais.

**Workflow (`.github/workflows/security.yml`):**
```yaml
name: Security Audit

on:
  push:
    branches:
      - dev
      - main
  pull_request:
    branches:
      - dev
      - main

jobs:
  security-audit:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run security audit
        run: npm audit
```

---

### Exercício 5: Git Branch e PR (Fase de Segurança)
Criamos a branch `feature/seguranca` e adicionamos os arquivos desenvolvidos até então.

**Comandos Utilizados:**
```bash
git checkout -b feature/seguranca
git add .
git commit -m "feat: add business logic, tests and security workflow"
git checkout dev
git merge feature/seguranca
```

---

### Exercício 6: Teste Unitário Isolado
Criamos o arquivo de teste unitário isolado dentro do diretório `/tests`.

**Teste Unitário (`tests/alerta.test.js`):**
```javascript
const { classificarAlerta } = require("../alerta");

test("alerta alto", () => {
  expect(classificarAlerta(70)).toBe("Alto");
});
```

---

### Exercício 7: Teste de Integração Adicional
Criamos o arquivo `tests/integracao.test.js` para exercitar a composição das funções sob o diretório de testes dedicado.

**Teste de Integração (`tests/integracao.test.js`):**
```javascript
const { classificarAlerta, enviarNotificacao } = require("../alerta");

test("classificação + notificação", () => {
  const alerta = classificarAlerta(90);
  const resultado = enviarNotificacao(alerta);
  expect(resultado).toBe("Notificação enviada: Crítico");
});
```

---

### Exercício 8: Simulação e Resolução de Erros de Teste
Modificamos o teste unitário para falhar propositalmente:
```javascript
test("alerta alto", () => {
  expect(classificarAlerta(90)).toBe("Alto"); // Retorna 'Crítico', esperado 'Alto'
});
```

**Resultado do Erro no Terminal (`npm test`):**
```text
FAIL tests/alerta.test.js
  ● alerta alto

    expect(received).toBe(expected) // Object.is equality

    Expected: "Alto"
    Received: "Crítico"

      2 |
      3 | test("alerta alto", () => {
    > 4 |   expect(classificarAlerta(90)).toBe("Alto");
        |                                 ^
      5 | });
```
**Resolução:**
O teste foi corrigido de volta para verificar o valor correspondente (`70` para classificar como `"Alto"`, ou `90` para classificar como `"Crítico"`), restabelecendo o status verde do pipeline.

---

### Exercício 9: Relatório de Cobertura de Testes
Executamos o relatório de cobertura para aferir a qualidade e alcance dos testes criados.

**Comando:**
```bash
npm test -- --coverage
```

**Resultado da Cobertura (100% de Cobertura):**
```text
PASS ./mock.test.js
PASS ./processamento.test.js
PASS tests/integracao.test.js
PASS tests/alerta.test.js
-----------|---------|----------|---------|---------|-------------------
File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------|---------|----------|---------|---------|-------------------
All files  |     100 |      100 |     100 |     100 |                   
 alerta.js |     100 |      100 |     100 |     100 |                   
-----------|---------|----------|---------|---------|-------------------
Test Suites: 4 passed, 4 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        2.476 s
```

**Representação Visual do Terminal de Testes:**
![Terminal de Testes e Cobertura](test_results_terminal.png)

---

### Exercício 10: Consolidação Final dos Testes no Pipeline (Commit & PR)
Consolidamos os testes em uma branch separada `feature/testes` e integramos ao ramo de desenvolvimento local.

**Comandos Utilizados:**
```bash
git checkout -b feature/testes
git add tests/
git commit -m "feat: add unit and integration tests under tests/"
git checkout dev
git merge feature/testes
```

---

## Como Exportar este Relatório para PDF:
1. Abra este arquivo `IEC-Atividade-Aula07-Report.md` no **VS Code**.
2. Instale a extensão **Markdown PDF** (desenvolvedor: *yzane*).
3. Clique com o botão direito no editor deste arquivo e selecione **Markdown PDF: Export (pdf)**.
4. O arquivo será salvo automaticamente como `IEC-Atividade-Aula07-Report.pdf` no mesmo diretório. Basta renomeá-lo para **`IEC-Atividade-Aula07.pdf`** para submissão da atividade!
