const express = require("express");
const prisma = require("../lib/prisma");

const router = express.Router();


// LISTAR TODOS OS PRODUTOS
router.get("/products", async (req, res) => {

    try {

        const products = await prisma.product.findMany({
            orderBy: {
                id: "asc"
            }
        });

        res.json(products);

    } catch (error) {

        console.error(
            "ERRO AO BUSCAR PRODUTOS:",
            error
        );

        res.status(500).json({
            error: "Erro ao buscar produtos.",
            details: error.message
        });

    }

});


// LISTAR PRODUTOS DE UM RESTAURANTE
router.get("/products/restaurant/:restaurantId", async (req, res) => {

    try {

        const restaurantId = Number(req.params.restaurantId);

        const products = await prisma.product.findMany({

            where: {
                restaurantId: restaurantId
            },

            orderBy: {
                id: "asc"
            }

        });

        res.json(products);

    } catch (error) {

        console.error(
            "ERRO AO BUSCAR PRODUTOS DO RESTAURANTE:",
            error
        );

        res.status(500).json({
            error: "Erro ao buscar produtos do restaurante.",
            details: error.message
        });

    }

});


// CRIAR PRODUTO
router.post("/products", async (req, res) => {

    try {

        const {
            name,
            description,
            price,
            category,
            restaurantId
        } = req.body;


        if (
            !name ||
            price === undefined ||
            !category ||
            !restaurantId
        ) {

            return res.status(400).json({
                error:
                    "Nome, preço, categoria e restaurante são obrigatórios."
            });

        }


        const product = await prisma.product.create({

            data: {

                name: name,

                description: description || null,

                price: Number(price),

                category: category,

                restaurantId: Number(restaurantId)

            }

        });


        res.status(201).json(product);

    } catch (error) {

        console.error(
            "ERRO AO CRIAR PRODUTO:",
            error
        );

        res.status(500).json({
            error: "Erro ao criar produto.",
            details: error.message
        });

    }

});


module.exports = router;
