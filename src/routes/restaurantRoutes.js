const express = require("express");
const prisma = require("../lib/prisma");

const router = express.Router();


// LISTAR RESTAURANTES
router.get("/restaurants", async (req, res) => {

    try {

        const restaurants = await prisma.restaurant.findMany({
            orderBy: {
                id: "asc"
            }
        });

        res.json(restaurants);

    } catch (error) {

        console.error(
            "ERRO AO BUSCAR RESTAURANTES:",
            error
        );

        res.status(500).json({
            error: "Erro ao buscar restaurantes.",
            details: error.message
        });

    }

});


// BUSCAR RESTAURANTE POR ID
router.get("/restaurants/:id", async (req, res) => {

    try {

        const id = Number(req.params.id);

        const restaurant =
            await prisma.restaurant.findUnique({

                where: {
                    id: id
                },

                include: {
                    products: true
                }

            });


        if (!restaurant) {

            return res.status(404).json({
                error: "Restaurante não encontrado."
            });

        }


        res.json(restaurant);

    } catch (error) {

        console.error(
            "ERRO AO BUSCAR RESTAURANTE:",
            error
        );

        res.status(500).json({
            error: "Erro ao buscar restaurante.",
            details: error.message
        });

    }

});


// CRIAR RESTAURANTE
router.post("/restaurants", async (req, res) => {

    try {

        const {
            name,
            category
        } = req.body;


        if (!name || !category) {

            return res.status(400).json({
                error: "Nome e categoria são obrigatórios."
            });

        }


        const restaurant =
            await prisma.restaurant.create({

                data: {
                    name: name,
                    category: category
                }

            });


        res.status(201).json(restaurant);

    } catch (error) {

        console.error(
            "ERRO AO CRIAR RESTAURANTE:",
            error
        );

        res.status(500).json({
            error: "Erro ao criar restaurante.",
            details: error.message
        });

    }

});


module.exports = router;