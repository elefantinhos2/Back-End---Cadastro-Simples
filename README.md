# Back-End---Cadastro-Simples
Sistema Para Cadastra um Usuário e seus Contatos

# Documentação da API

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Início Rápido](#2-início-rápido)
  - [Instalando Dependências](#21-instalando-dependências)
  - [Variáveis de Ambiente](#22-variáveis-de-ambiente)
  - [Migrations](#23-migrations)

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [uuid](https://www.npmjs.com/package/uuid)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [bcryptjs](https://www.npmjs.com/package/bcrypt)


## 2. Início Rápido

[ Voltar para o topo ](#tabela-de-conteúdos)

### 2.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn
```

### 2.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:

```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 2.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

## 3. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [User]()
  - [POST - /register](#1.1-criação-de-usuário)
  - [POST - /login]()
  - [GET - /users]()
  - [GET - /users/contacts]()

## 1. **User**

[ Voltar para os Endpoints ](#5-endpoints)

A criação do usuário é definida pelos campos abaixo

| Campo        | Tipo    | Descrição                                        |
| ------------ | ------- | ------------------------------------------------ |
| id           | string  | Identificador único do usuário.                  |
| name         | string  | O nome do usuário.                               |
| email        | string  | O e-mail do usuário.                             |
| phone_number | string  | O número de contato do usuário.                  |

## Endpoints

| Método | Rota              | Descrição                                        |
| ------ | ----------------- | ------------------------------------------------ |
| POST   | /register         | Criação de um Usuário.                           |
| POST   | /login            | Gera o token de autenticação.                    |
| GET    | /users            | Lista todos os usuários.                         |
| PATCH  | /users            | Atualiza um Usuario usando seu ID como parâmetro |
| DELETE | /users            | Deleta um Usuario usando seu ID como parâmetro   |
| GET    | /users/contacts   | Lista um Usuario usando seu ID como parâmetro    |
| POST   | /contacts         | Criação de um Contato                            |
| GET    | /contacts         | Lista Todos os Contatos                          |
| PATCH  | /contacts/:id     | Atualiza um Contato usando seu ID como parâmetro |
| DELETE   | /contacts/:id     | Deleta um Contato usando seu ID como parâmetro |

### 1.1. **Criação de Usuario**

### `/register`

### Exemplo de Request:

```
POST /register
Host: http://localhost:3000
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZlNTlkMmQ2LTg5MmUtNGE5OC1iNjJjLWJiM2RkZWVmYWM4MiIsImFkbSI6ZmFsc2UsImlhdCI6MTY1ODM1MTk2MiwiZXhwIjoxNjU4MzU1NTYyfQ._S5WW_T4kDMnVTLjESv2GqQgjO21pNBW9O2dxejWXFM
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Shanks",
  "email": "Shanks@email.com",
  "phone_number": "9999-2122"
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "00dfaa44-8032-4d05-9e65-a8f764c6af53",
  "name": "Shanks",
  "email": "Shanks@email.com",
  "phone_number": "9999-2122",
  "created_at": "2022-09-25T20:02:41.068Z"
}
```

### Possíveis Erros:

| Código do Erro | Descrição                 |
| -------------- | ------------------------- |
| 409 Conflict   | Email already registered. |

| Código do Erro | Descrição                 |
| -------------- | ------------------------- |
| 400 Bad Request| Illegal arguments.        |

### 1.2. Autenticação

[ Voltar para o topo ](#tabela-de-conteúdos)

### `/login`

### Exemplo de Request:

```
POST /login
Host: http://localhost:3000
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "email": "Shanks@email.com"
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZlNTlkMmQ2LTg5MmUtNGE5OC1iNjJjLWJiM2RkZWVmYWM4MiIsImFkbSI6ZmFsc2UsImlhdCI6MTY1ODM1NDM4MiwiZXhwIjoxNjU4MzU3OTgyfQ.ERXtzLfQ9KtDsMaqWrQczgonuYxGo9XT5a6bI0u2ZkU"
}
```

### Possíveis Erros:

| Código do Erro | Descrição             |
| -------------- | --------------------- |
| 404 Not Found  | Account not found.    |

### 1.3. **Listando Usuários**

### `/users`

### Exemplo de Request:

```
GET /users
Host: http://localhost:3000
Authorization: None
Content-type: application/json
```

Para listar todos os usuários, você não precisa estar logado.

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
	{
		"id": "aa3f4db7-5471-45dd-8b99-9c8233e6388b",
		"name": "Douglas",
		"email": "Douglas@email.com",
		"phone_number": "9999-2121",
		"created_at": "2022-09-25T18:02:50.448Z",
		"updated_at": "2022-09-25T18:02:50.448Z"
	},
	{
		"id": "00dfaa44-8032-4d05-9e65-a8f764c6af53",
		"name": "Shanks",
		"email": "Shanks@email.com",
		"phone_number": "9999-2122",
		"created_at": "2022-09-25T20:02:41.068Z",
		"updated_at": "2022-09-25T20:02:41.068Z"
	}
]
```

### Possíveis Erros:

| Código do Erro  | Descrição                         |
| --------------- | --------------------------------- |
| 401 Unathorized | Invalid token.                    |

### 1.4. **Atualizando Usuários**

### `/users`

### Exemplo de Request:

```
PATCH /users
Host: http://localhost:3000
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZlNTlkMmQ2LTg5MmUtNGE5OC1iNjJjLWJiM2RkZWVmYWM4MiIsImFkbSI6ZmFsc2UsImlhdCI6MTY1ODM1MTk2MiwiZXhwIjoxNjU4MzU1NTYyfQ._S5WW_T4kDMnVTLjESv2GqQgjO21pNBW9O2dxejWXFM
Content-type: application/json
```
Para Atualizar um único os usuários você precisa estar logado.

OBS: Todas as informações podem ser atualizados, ou apenas uma

### Corpo da Requisição:

```json
{
	"name": "Shank - O Ruivo"
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
	"message": "User updated",
	"user": {
		"id": "00dfaa44-8032-4d05-9e65-a8f764c6af53",
		"name": "Shank - O Ruivo",
		"email": "Shanks@email.com",
		"phone_number": "9999-2122",
		"updated_at": "2022-09-25T20:03:37.821Z"
	}
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                         |
| --------------- | --------------------------------- |
| 401 Unathorized | Invalid token.                    |

### 1.5. **Deletando Usuários Especifico**

### `/users`

### Exemplo de Request:

```
DELETE /users
Host: http://localhost:3000
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZlNTlkMmQ2LTg5MmUtNGE5OC1iNjJjLWJiM2RkZWVmYWM4MiIsImFkbSI6ZmFsc2UsImlhdCI6MTY1ODM1MTk2MiwiZXhwIjoxNjU4MzU1NTYyfQ._S5WW_T4kDMnVTLjESv2GqQgjO21pNBW9O2dxejWXFM
Content-type: application/json
```
Para Deletar um único os usuários você precisa estar logado.


### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
	"message": "User Delete",
	"userContact": {
		"id": "55743eab-0889-4aa2-81b4-029672a8d432",
		"name": "Shank - O Ruivo",
		"email": "Shanks@email.com",
		"phone_number": "9999-2122",
		"created_at": "2022-09-25T19:12:37.755Z",
		"updated_at": "2022-09-25T19:13:19.567Z",
		"contacts": []
	}
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                         |
| --------------- | --------------------------------- |
| 401 Unathorized | Invalid token.                    |

### 1.6. **Listando Usuários Especifico**

### `/users/contacts`

### Exemplo de Request:

```
GET /users/contacts
Host: http://localhost:3000
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZlNTlkMmQ2LTg5MmUtNGE5OC1iNjJjLWJiM2RkZWVmYWM4MiIsImFkbSI6ZmFsc2UsImlhdCI6MTY1ODM1MTk2MiwiZXhwIjoxNjU4MzU1NTYyfQ._S5WW_T4kDMnVTLjESv2GqQgjO21pNBW9O2dxejWXFM
Content-type: application/json
```
Para listar um único os usuários você precisa estar logado, pois recebera informações dos contatos do usuario logado.

### Exemplo de Response:

```
200 OK
```

```json
{
	"id": "00dfaa44-8032-4d05-9e65-a8f764c6af53",
	"name": "Shank - O Ruivo",
	"email": "Shanks@email.com",
	"phone_number": "9999-2122",
	"created_at": "2022-09-25T20:02:41.068Z",
	"updated_at": "2022-09-25T20:03:37.821Z",
	"contacts": [
		{
			"id": "efb9dcd9-fbdb-42b1-9e3f-864ff7889901",
			"name": "Yassop",
			"email": "Yassop@email.com",
			"phone_number": "2222-2222",
			"created_at": "2022-09-25T20:06:47.602Z",
			"updated_at": "2022-09-25T20:06:47.602Z"
		}
	]
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                         |
| --------------- | --------------------------------- |
| 401 Unathorized | Invalid token.                    |


## 2. **Contacts**

### 2.1. **Criando Contatos**

### `/contacts`

### Exemplo de Request:

```
POST /contacts
Host: http://localhost:3000
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZlNTlkMmQ2LTg5MmUtNGE5OC1iNjJjLWJiM2RkZWVmYWM4MiIsImFkbSI6ZmFsc2UsImlhdCI6MTY1ODM1MTk2MiwiZXhwIjoxNjU4MzU1NTYyfQ._S5WW_T4kDMnVTLjESv2GqQgjO21pNBW9O2dxejWXFM
Content-type: application/json
```

Para Cadastrar um contato, voce deve estar logado.

### Corpo da Requisição:

```json
{
  "name": "Yassop",
  "email": "Yassop@email.com",
  "phone_number": "2222-2222"
}
```

### Exemplo de Response:

```
201 CREATED
```

```json
{
  "id": "efb9dcd9-fbdb-42b1-9e3f-864ff7889901",
  "name": "Yassop",
  "email": "Yassop@email.com",
  "phone_number": "2222-2222",
  "created_at": "2022-09-25T20:06:47.602Z"
}
```

### 2.2. **Listando Contatos**

### `/contacts`

### Exemplo de Request:

```
GET /contacts
Host: http://localhost:3000
Authorization: None
Content-type: application/json
```

Não é necessario estar logado, para listar todos os contatos

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
	{
		"id": "09160381-d062-4d00-a88f-1e7c3a818a83",
		"name": "Yassop",
		"email": "Yassop@email.com",
		"phone_number": "2222-2222",
		"created_at": "2022-09-25T22:18:01.029Z",
		"updated_at": "2022-09-25T22:18:01.029Z"
	},
	{
		"id": "5fd8afe1-4332-4ef0-97e2-9c4a3fe58306",
		"name": "Ben Beckman",
		"email": "Beckman@email.com",
		"phone_number": "2222-2223",
		"created_at": "2022-09-25T22:19:06.261Z",
		"updated_at": "2022-09-25T22:19:06.261Z"
	}
]
```

### 2.2. **Atualizando Contato**

### `/contacts/:id`

### Exemplo de Request:

```
PATCH /contacts/11288fd9-5c1c-40b8-a6c9-66b95574f0fb
Host: http://localhost:3000
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZlNTlkMmQ2LTg5MmUtNGE5OC1iNjJjLWJiM2RkZWVmYWM4MiIsImFkbSI6ZmFsc2UsImlhdCI6MTY1ODM1MTk2MiwiZXhwIjoxNjU4MzU1NTYyfQ._S5WW_T4kDMnVTLjESv2GqQgjO21pNBW9O2dxejWXFM
Content-type: application/json
```

Para atualizar um contato o usuario deve estar logado, e informar o id do contato a ser atualizado

OBS: Todas as informações podem ser atualizados, ou apenas uma

### Corpo da Requisição:

```json
{
	"name": "Ben Beckman"
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
	"message": "Contact updated",
	"contact": {
		"id": "efb9dcd9-fbdb-42b1-9e3f-864ff7889901",
		"name": "Ben Beckman",
		"email": "Yassop@email.com",
		"phone_number": "2222-2229",
		"updated_at": "2022-09-25T21:11:15.877Z"
	}
}
```

### 2.2. **Deletando Contato**

### `/contacts/:id`

### Exemplo de Request:

```
PATCH /contacts/11288fd9-5c1c-40b8-a6c9-66b95574f0fb
Host: http://localhost:3000
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZlNTlkMmQ2LTg5MmUtNGE5OC1iNjJjLWJiM2RkZWVmYWM4MiIsImFkbSI6ZmFsc2UsImlhdCI6MTY1ODM1MTk2MiwiZXhwIjoxNjU4MzU1NTYyfQ._S5WW_T4kDMnVTLjESv2GqQgjO21pNBW9O2dxejWXFM
Content-type: application/json
```

Para deletar um contato o usuario deve estar logado, e informar o id do contato a ser exluido

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
	"message": "Contact Delete",
	"userContact": {
		"id": "efb9dcd9-fbdb-42b1-9e3f-864ff7889901",
		"name": "Ben Beckman",
		"email": "Yassop@email.com",
		"phone_number": "2222-2229",
		"created_at": "2022-09-25T20:06:47.602Z",
		"updated_at": "2022-09-25T21:11:15.877Z"
	}
}
```