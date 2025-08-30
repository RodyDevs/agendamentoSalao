# Sistema de Agendamento - Salão de Beleza

---

## 📄 Descrição

Este projeto consiste em um sistema web para gerenciamento de agendamentos em um salão de beleza. Ele integra a um banco de dados de usuário e tem como objetivo principal o uso do Spring Boot.

---

## 🛠️ Tecnologias Utilizadas

* `Java 21`
* `Spring Boot 3.2.0`
* `Spring Data JPA`
* `Hibernate ORM`
* `MySQL`
* `Maven`
* `Thymeleaf` (para as páginas)
* `VSCODE`
---

## ✨ Funcionalidades

* Cadastro de agendamento válido
* Listagem de agendamentos realizados com base nos campos
* Validação de dados básicos para evitar inconsistências

---

## 🗄️ Banco de Dados

### Configuração

* **Tipo:** MySQL
* **URL:** `jdbc:mysql://localhost:3306/salaodb`
* **Usuário:** `root`
* **Senha:** ``
---

## 🚀 Como Executar o Projeto

Instruções passo a passo para configurar e rodar o projeto localmente.

1.  **Certifique-se de que o MySQL esteja instalado e rodando na porta `3306`.**
2.  **Crie o banco de dados conforme as credenciais mencionadas acima.**
3.  **Configure as credenciais no arquivo `application.properties` (ou `application.yml`) do Spring Boot.**
4.  **Execute o comando `mvn clean install` no diretório raiz do projeto.**
5.  **Acesse a aplicação em:** `http://localhost:8080/`

---

## 🧪 Plano de Testes

| Teste | Rescritor Esperado | Orienteiro | Status (OK/Fail) |
| :---------------------- | :------------------------ | :------------------- | :--------------- |
| Cadastro de agendamento válido | Cadastrado sem nome | Nome | OK |
| Cadastro sem nome | Cadastrar | E-mail | OK |
| Listar agendamentos | Listar | Lista | Filtrada |
| Consulta por data (se implementado) | Consulta por data | Filtragem por data | OK/Falha |

---

## ✍️ Autor

*Rodney Monteiro*
---

## ⚠️ Observações

O projeto está em estágio inicial e pode ser expandido com funcionalidades como editar, deletar e agendamentos, autenticação, entre outros.

Para dúvidas ou sugestões, favor entrar em contato.
