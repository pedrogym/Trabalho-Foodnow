# FoodNow 🍔

Sistema web de delivery desenvolvido como projeto acadêmico, permitindo que usuários explorem restaurantes, visualizem cardápios, montem pedidos e acompanhem seus pedidos.

## 📌 Sobre o projeto

O **FoodNow** é uma aplicação web de delivery desenvolvida com arquitetura cliente-servidor.

O sistema possui uma interface moderna para usuários e um painel administrativo para gerenciamento de restaurantes, produtos e pedidos.

## 🚀 Funcionalidades

### Usuário

* Cadastro de usuário
* Login e autenticação com JWT
* Visualização de restaurantes
* Busca por restaurantes
* Filtro por categorias
* Visualização do cardápio
* Adição de produtos ao carrinho
* Alteração da quantidade de produtos
* Remoção de produtos do carrinho
* Finalização de pedidos
* Visualização do histórico de pedidos
* Acompanhamento do status dos pedidos

### Restaurante / Administração

* Cadastro de restaurantes
* Cadastro de produtos
* Associação de produtos aos restaurantes
* Visualização dos pedidos
* Atualização do status dos pedidos

## 🛠️ Tecnologias utilizadas

* **Node.js**
* **Express**
* **PostgreSQL**
* **Prisma ORM**
* **JWT**
* **bcryptjs**
* **HTML5**
* **CSS3**
* **JavaScript**

## 📁 Estrutura do projeto

```text
FoodNow/
├── prisma/
│   └── schema.prisma
│
├── public/
│   ├── index.html
│   ├── login.html
│   ├── cadastro.html
│   ├── restaurant.html
│   ├── pedidos.html
│   ├── painel.html
│   └── style.css
│
├── src/
│   ├── lib/
│   │   └── prisma.js
│   │
│   └── routes/
│       ├── orderRoutes.js
│       ├── productRoutes.js
│       ├── restaurantRoutes.js
│       └── userRoutes.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

## ⚙️ Requisitos

Antes de executar o projeto, é necessário ter instalado:

* Node.js
* PostgreSQL
* Git

## 📥 Instalação

Clone o repositório:

```bash
git clone https://github.com/pedrogym/Trabalho-Foodnow.git
```

Entre na pasta:

```bash
cd Trabalho-Foodnow
```

Instale as dependências:

```bash
npm install
```

## 🔐 Configuração do banco de dados

Crie um banco PostgreSQL chamado:

```text
foodnow
```

Depois, crie um arquivo `.env` na raiz do projeto.

Use o `.env.example` como referência:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/foodnow?schema=public"
PORT=3000
```

Substitua `SUA_SENHA` pela senha do seu PostgreSQL.

> O arquivo `.env` não deve ser enviado para o GitHub, pois contém informações de acesso ao banco de dados.

## 🗄️ Configuração do Prisma

Gere o Prisma Client:

```bash
npx prisma generate
```

Sincronize o banco de dados:

```bash
npx prisma db push
```

## ▶️ Executando o projeto

Inicie o servidor:

```bash
npm run dev
```

O servidor será iniciado na porta:

```text
http://localhost:3000
```

Acesse o endereço no navegador para utilizar o FoodNow.

## 🔑 Autenticação

O sistema utiliza **JSON Web Token (JWT)** para autenticação dos usuários.

As senhas são armazenadas utilizando **bcryptjs**, evitando o armazenamento de senhas em texto puro.

## 🗃️ Banco de dados

O projeto utiliza PostgreSQL com Prisma ORM.

Principais entidades:

* User
* Restaurant
* Product
* Order
* OrderItem

Os relacionamentos permitem associar usuários aos pedidos, produtos aos restaurantes e itens aos pedidos.

## 📦 Principais rotas da API

### Usuários

```text
POST /users
GET /users
GET /users/:id
PUT /users/:id
POST /login
```

### Restaurantes

```text
GET /restaurants
POST /restaurants
GET /restaurants/:id
PUT /restaurants/:id
DELETE /restaurants/:id
```

### Produtos

```text
GET /products
GET /products/restaurant/:restaurantId
POST /products
```

### Pedidos

```text
POST /orders
GET /orders
GET /orders/:id
PUT /orders/:id/status
GET /restaurants/:restaurantId/orders
```

## 🎓 Projeto acadêmico

Projeto desenvolvido para fins acadêmicos, com o objetivo de aplicar conceitos de:

* Desenvolvimento de aplicações web
* APIs REST
* Banco de dados relacional
* ORM
* Autenticação
* Desenvolvimento de interfaces
* Integração entre frontend e backend

## 👨‍💻 Desenvolvedor

**Pedro**

GitHub: [@pedrogym](https://github.com/pedrogym)
