const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
    console.log("Iniciando seed do FoodNow...");

    const senha = await bcrypt.hash("123456", 10);

    await prisma.user.upsert({
        where: {
            email: "pedro@foodnow.com"
        },
        update: {},
        create: {
            name: "Pedro",
            email: "pedro@foodnow.com",
            password: senha
        }
    });

    const burger = await prisma.restaurant.upsert({
        where: {
            id: 1
        },
        update: {
            name: "FoodNow Burger",
            category: "Hamburguer"
        },
        create: {
            name: "FoodNow Burger",
            category: "Hamburguer"
        }
    });

    const pizza = await prisma.restaurant.upsert({
        where: {
            id: 2
        },
        update: {
            name: "FoodNow Pizza",
            category: "Pizza"
        },
        create: {
            name: "FoodNow Pizza",
            category: "Pizza"
        }
    });

    await prisma.product.upsert({
        where: {
            id: 1
        },
        update: {},
        create: {
            name: "FoodNow Burger",
            description: "Hambúrguer artesanal com queijo e molho especial.",
            price: 29.90,
            category: "Hamburguer",
            restaurantId: burger.id
        }
    });

    await prisma.product.upsert({
        where: {
            id: 2
        },
        update: {},
        create: {
            name: "Pizza Calabresa",
            description: "Pizza de calabresa com queijo.",
            price: 39.90,
            category: "Pizza",
            restaurantId: pizza.id
        }
    });

    console.log("Seed concluído!");
    console.log("Email: pedro@foodnow.com");
    console.log("Senha: 123456");
}

main()
    .catch((error) => {
        console.error("Erro no seed:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });