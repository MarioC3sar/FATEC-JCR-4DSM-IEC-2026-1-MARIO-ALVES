# INPE - Monitoramento Climático e Alertas de Queimada

Este projeto simula o sistema de monitoramento de queimadas do INPE (Instituto Nacional de Pesquisas Espaciais). A qualidade do código é assegurada por testes automáticos integrados à esteira de CI/CD (Integração Contínua), garantindo cobertura de 100% nas funções críticas.

## Badges de Monitoramento

<!-- Exercício 5: Adição de badges de status do pipeline e cobertura -->
[![CI Pipeline](https://github.com/lucineidefatec/FATEC-JCR-4DSM-IEC-2026-1-seunome/actions/workflows/ci.yml/badge.svg)](https://github.com/lucineidefatec/FATEC-JCR-4DSM-IEC-2026-1-seunome/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/lucineidefatec/FATEC-JCR-4DSM-IEC-2026-1-seunome/branch/main/graph/badge.svg?token=YOUR_TOKEN)](https://codecov.io/gh/lucineidefatec/FATEC-JCR-4DSM-IEC-2026-1-seunome)

---

## 🛠️ Tecnologias Utilizadas

- **Runtime:** Node.js
- **Testes:** Jest
- **Relatório de Cobertura:** Jest Coverage & Codecov
- **Orquestração de CI:** GitHub Actions

---

## 🚀 Como Executar os Testes Localmente

### 1. Instalar as dependências:
```bash
npm install
```

### 2. Executar os testes unitários e de integração:
```bash
npm run test
```

### 3. Gerar o relatório de cobertura de testes (Exercício 1):
```bash
npm run test:coverage
```
Este comando criará uma pasta `coverage/` na raiz do projeto com o relatório visual em formato HTML (acesse abrindo `./coverage/lcov-report/index.html` no navegador) e arquivos estruturados para envio às ferramentas de governança de código.

---

## 🔧 Estrutura do Pipeline de CI (GitHub Actions)

O pipeline configurado em `.github/workflows/ci.yml` realiza o seguinte fluxo a cada atualização (Push/Pull Request):

1. **Setup do Ambiente:** Clona o repositório e instala as dependências em uma máquina virtual Linux.
2. **Execução de Testes com Cobertura:** Executa `npm run test:coverage`. Se algum teste falhar ou a cobertura mínima não for alcançada, o pipeline bloqueia o Pull Request para a branch `main`.
3. **Upload para Codecov:** Envia o relatório gerado (`./coverage/clover.xml`) de forma segura para o Codecov.

---

## 📊 Governança e Transparência (Codecov)

O Codecov é utilizado para auditar a evolução da qualidade ao longo do tempo. 

Para configurar o envio automático:
1. Cadastre o repositório na plataforma [Codecov](https://about.codecov.io/).
2. Obtenha o token de upload da plataforma.
3. Adicione o token como um Segredo do GitHub (`Actions Secrets`) com o nome `CODECOV_TOKEN`.
