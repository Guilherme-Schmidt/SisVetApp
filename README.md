# SisVet - Sistema de Gerenciamento de Clinica Veterinária

Este projeto é um sistema de gerenciamento de compras para uma clínica veterinária. Ele permite o cadastro e a visualização de clientes, seus respectivos animais de estimação, e a criação de compras associadas a produtos disponíveis. O projeto está em constante desenvolvimento e serve como uma ferramenta de estudo.

## Tecnologias Utilizadas

### Backend

- **Java Spring Boot**: Framework para construção do backend.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados.
- **Maven**: Ferramenta de gerenciamento de dependências.

### Frontend

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **React Bootstrap**: Biblioteca de componentes de interface para React baseada no Bootstrap.
- **Axios**: Biblioteca para realizar requisições HTTP.

## Funcionalidades

### Backend

- Listar todos os produtos
- Listar todos os clientes
- Cadastrar novas compras
- Listar compras por cliente

### Frontend

- Formulário para cadastrar novas compras
- Listagem de produtos
- Listagem de clientes
- Listagem de Animais
- Visualização das compras de um cliente específico

## Pré-requisitos

- JDK 21
- PostgreSQL
- Node.js e npm (para o frontend)
- IDE Java (Eclipse, IntelliJ IDEA ou NetBeans)

## Configuração do Projeto

### Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
 ```

### Configurar o Banco de Dados
- Crie um banco de dados PostgreSQL.
- Configure as credenciais do banco de dados no arquivo application.properties.

  ```bash
   spring.datasource.url=jdbc:postgresql://localhost:5432/nome_do_banco
   spring.datasource.username=seu_usuario
   spring.datasource.password=sua_senha
   spring.jpa.hibernate.ddl-auto=update
  ```

## Como Executar
### Backend
- Execute a Aplicação
   Localize e execute o arquivo principal (Application.java) para iniciar a aplicação.

### Frontend
- Execute a Aplicação
   Navegue até a pasta do frontend e inicie a aplicação React:

  ```bash
     cd frontend
     npm start
  ```


### Interaja com o Sistema

Use a interface do sistema para realizar operações de cadastro, listagem, atualização e exclusão de clientes, animais e compras.
  
  


