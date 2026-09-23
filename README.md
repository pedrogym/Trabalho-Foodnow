# FoodNow

Projeto simples de pedidos de comida desenvolvido com Node.js, Express, PostgreSQL e Prisma.

## Funcionalidades

- Cadastro de restaurantes via API
- Cadastro de produtos via API
- Cardápio por restaurante
- Carrinho com quantidade
- Criação de pedidos
- Visualização dos pedidos
- Status do pedido

## Instalação

1. Instale Node.js e PostgreSQL.
2. Crie um banco chamado `foodnow`.
3. Copie `.env.example` para `.env`.
4. Altere a senha do PostgreSQL no `.env`.
5. Execute:

```bash
npm install
npx.cmd prisma generate
npx.cmd prisma db push
```

6. Inicie:

```bash
npm.cmd run dev
```

7. Abra:

http://localhost:3000/

## Criar dados de teste

Depois de iniciar o servidor, use uma ferramenta como Postman ou PowerShell.

Criar restaurante:

```json
POST http://localhost:3000/restaurants

{
  "name": "Burger House",
  "category": "Hamburgueria"
}
```

Criar produto:

```json
POST http://localhost:3000/products

{
  "name": "X-Burger",
  "description": "Hambúrguer artesanal com queijo",
  "price": 24.90,
  "category": "Hambúrguer",
  "restaurantId": 1
}
```

Depois acesse a página inicial e o restaurante aparecerá no sistema.
