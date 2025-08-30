# Documentação de BugTracking do Sistema de Salão

## 1. Rastreamento Visual de Erros

### 1.1 Interface do Cliente

#### Erro de Validação de Formulário
![Erro de Validação](./images/form-validation-error.png)
* **Onde encontrar**: Na tela de cadastro de cliente quando os campos obrigatórios não são preenchidos
* **Como reproduzir**: 
  1. Acesse a página de cadastro de cliente
  2. Deixe o campo "Nome" em branco
  3. Tente salvar
* **Mensagem esperada**: "Por favor, preencha os campos obrigatórios"

#### Erro de Email Duplicado
![Email Duplicado](./images/duplicate-email-error.png)
* **Local**: Tela de cadastro/edição de cliente
* **Reprodução**:
  1. Tente cadastrar um cliente com email já existente
  2. Clique em salvar
* **Mensagem**: "Email já cadastrado no sistema"

### 1.2 Interface de Agendamento

#### Conflito de Horários
![Conflito de Horário](./images/schedule-conflict.png)
* **Onde**: Tela de agendamento
* **Como identificar**:
  - Horário aparece em vermelho
  - Tooltip mostra "Horário indisponível"

### 1.3 Logs do Sistema

#### Console do Navegador
![Console Log](./images/browser-console.png)
* **Como acessar**:
  1. Pressione F12 no navegador
  2. Selecione a aba "Console"
  3. Observe os erros em vermelho

#### Logs do Servidor
![Server Logs](./images/server-logs.png)
* **Localização**: `/logs/salao.log`
* **Formato**: `[DATA] [NÍVEL] [CLASSE] - Mensagem de erro`

## 2. Monitoramento em Tempo Real

### 2.1 Dashboard de Erros
![Dashboard](./images/error-dashboard.png)
* Acompanhamento de:
  - Taxa de erros
  - Tempo de resposta
  - Requisições por minuto
  - Status do servidor

### 2.2 Alertas
![Sistema de Alertas](./images/alert-system.png)
* **Configuração**:
  - Erro crítico: Email + SMS
  - Aviso: Apenas email
  - Info: Dashboard

## 3. Procedimentos de Debug

### 3.1 Frontend
```javascript
// Ative o modo debug no console
localStorage.setItem('debug', 'true');

// Verifique requisições na aba Network
// F12 > Network > XHR
```

### 3.2 Backend
```java
// Adicione logs detalhados
logger.debug("Processando cliente: {}", cliente.getId());
logger.error("Erro ao salvar: {}", e.getMessage());
```

## 4. Checklist de Verificação

### 4.1 Antes de Reportar um Bug
- [ ] Reproduziu o erro mais de uma vez?
- [ ] Verificou os logs do console?
- [ ] Limpou o cache do navegador?
- [ ] Testou em outro navegador?
- [ ] Capturou screenshot do erro?

### 4.2 Informações Necessárias no Reporte
1. Passos para reproduzir
2. Ambiente (navegador, SO)
3. Data/hora do ocorrido
4. Screenshot do erro
5. Logs relevantes

## 5. Ferramentas de Diagnóstico

### 5.1 Frontend
* Chrome DevTools
* React Developer Tools
* Network Monitor

### 5.2 Backend
* Debug do Eclipse/IntelliJ
* Logs do Spring Boot
* MySQL Workbench

## 6. Roteiro de Solução de Problemas

### 6.1 Problemas de Performance
1. Verifique o número de requisições
2. Analise tempo de resposta
3. Monitore uso de memória
4. Verifique queries lentas

### 6.2 Erros de Dados
1. Valide entrada de dados
2. Verifique integridade do banco
3. Confirme relacionamentos
4. Teste constraints

## 7. Contatos

### 7.1 Suporte Nível 1
* Email: suporte.n1@salao.com
* Tel: (XX) XXXX-XXXX
* Horário: 8h às 18h

### 7.2 Suporte Nível 2
* Email: suporte.n2@salao.com
* Tel: (XX) XXXX-XXXX
* Plantão 24/7

### 7.3 Emergências
* Tel: (XX) XXXX-XXXX
* WhatsApp: (XX) XXXX-XXXX

## 8. Atualizações do Documento

| Data | Versão | Descrição | Autor |
|------|---------|-----------|--------|
| 28/08/2025 | 1.0 | Criação do documento | Equipe de Desenvolvimento |

---

**Nota**: As imagens mencionadas neste documento precisam ser adicionadas na pasta `/docs/images/`. Por favor, capture as telas relevantes do seu sistema e adicione-as com os nomes correspondentes mencionados no documento.
