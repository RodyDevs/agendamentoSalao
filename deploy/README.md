# Instruções de Deploy - Sistema de Agendamento de Salão

## Requisitos do Sistema

- Java 11 ou superior
- MySQL 8.0 ou superior
- Maven 3.6 ou superior

## Configuração do Banco de Dados

1. Crie um banco de dados MySQL:
```sql
CREATE DATABASE salao_db;
```

2. Configure as credenciais no arquivo `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/salao_db
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```

## Compilação e Empacotamento

1. Na raiz do projeto, execute:
```bash
mvn clean package
```

2. O arquivo JAR será gerado em `target/salao-0.0.1-SNAPSHOT.jar`

## Execução da Aplicação

### Desenvolvimento
```bash
mvn spring-boot:run
```

### Produção
```bash
java -jar target/salao-0.0.1-SNAPSHOT.jar
```

## Acesso à Aplicação

- Interface Web: http://localhost:8080
- API REST: http://localhost:8080/api

## Endpoints da API

### Clientes
- GET /api/clientes - Lista todos os clientes
- POST /api/clientes - Cadastra novo cliente
- GET /api/clientes/{id} - Busca cliente por ID
- PUT /api/clientes/{id} - Atualiza cliente
- DELETE /api/clientes/{id} - Remove cliente

### Agendamentos
- GET /api/agendamentos - Lista todos os agendamentos
- POST /api/agendamentos - Cria novo agendamento
- GET /api/agendamentos/{id} - Busca agendamento por ID
- DELETE /api/agendamentos/{id} - Cancela agendamento

## Páginas da Aplicação

1. Página Inicial (/) - Lista de clientes
2. Cadastro de Cliente (/cadastrar)
3. Lista de Agendamentos (/agendamento/lista)
4. Novo Agendamento (/agendamento/novo)

## Monitoramento e Logs

- Logs da aplicação são gravados em `logs/salao.log`
- Monitore o uso de memória e CPU do processo Java
- Verifique o espaço em disco periodicamente

## Backup

1. Backup do Banco de Dados:
```bash
mysqldump -u usuario -p salao_db > backup_salao_db.sql
```

2. Backup dos Arquivos:
- Faça backup regular do diretório de uploads (se existir)
- Mantenha cópia do arquivo application.properties

## Solução de Problemas

1. Se a aplicação não iniciar:
   - Verifique se o MySQL está rodando
   - Confira as credenciais no application.properties
   - Verifique os logs em logs/salao.log

2. Erros de conexão com banco:
   - Teste a conexão com o MySQL manualmente
   - Verifique as configurações de firewall

3. Problemas de memória:
   - Ajuste os parâmetros da JVM: -Xms512m -Xmx1024m

## Segurança

1. Recomendações:
   - Use HTTPS em produção
   - Mantenha o MySQL atualizado
   - Faça backup regularmente
   - Monitore os logs de acesso

2. Configurações de Firewall:
   - Libere apenas as portas necessárias (8080, 3306)
   - Restrinja acesso ao MySQL apenas para o servidor da aplicação

## BugTracking e Resolução de Problemas Comuns

### 1. Problemas de Cadastro de Cliente

#### Sintoma: Erro 400 ao cadastrar cliente
- **Causa Possível**: Campos obrigatórios não preenchidos
- **Solução**: Verificar se nome e telefone foram preenchidos
- **Log**: Verifique mensagem de erro no console do navegador

#### Sintoma: Email duplicado
- **Causa**: Tentativa de cadastrar email já existente
- **Solução**: Use outro email ou recupere a conta existente
- **Prevenção**: Sistema já valida automaticamente

### 2. Problemas de Agendamento

#### Sintoma: Lista de clientes não aparece no agendamento
- **Causa Possível**: Falha na comunicação com API
- **Solução**: 
  1. Verifique conexão com servidor
  2. Recarregue a página
  3. Limpe o cache do navegador

#### Sintoma: Erro ao salvar agendamento
- **Causa Possível**: Conflito de horários
- **Solução**: Escolha outro horário disponível
- **Prevenção**: Implementar validação de conflitos

### 3. Problemas de Exclusão

#### Sintoma: Erro 400 ao excluir cliente
- **Causa**: Cliente possui agendamentos vinculados
- **Solução**: Remova primeiro os agendamentos do cliente
- **Mensagem**: "Este cliente não pode ser excluído pois possui agendamentos"

#### Sintoma: Cliente não é removido da lista após exclusão
- **Causa**: Falha na atualização da interface
- **Solução**: 
  1. Recarregue a página
  2. Verifique se a exclusão foi concluída no banco

### 4. Problemas de Performance

#### Sintoma: Carregamento lento da lista de clientes
- **Causa Possível**: 
  1. Muitos registros no banco
  2. Conexão lenta
- **Solução**: 
  1. Implementar paginação
  2. Otimizar consultas
  3. Verificar índices do banco

#### Sintoma: Travamentos na interface
- **Causa**: Operações síncronas bloqueantes
- **Solução**: 
  1. Verificar código assíncrono
  2. Implementar loading indicators
  3. Otimizar chamadas à API

### 5. Monitoramento e Prevenção

#### Logs do Sistema
```bash
# Verificar logs da aplicação
tail -f logs/salao.log

# Verificar logs do MySQL
tail -f /var/log/mysql/error.log
```

#### Checklist Diário
- [ ] Verificar logs de erro
- [ ] Monitorar uso de memória
- [ ] Verificar backup do banco
- [ ] Testar funcionalidades críticas

#### Manutenção Preventiva
1. Limpar logs antigos
2. Backup do banco de dados
3. Verificar espaço em disco
4. Atualizar dependências

### 6. Contato e Suporte

Para reportar bugs ou solicitar suporte:
- Email: suporte@salaosistema.com
- Tel: (XX) XXXX-XXXX
- GitHub Issues: [link do repositório]
