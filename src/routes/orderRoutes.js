const express = require("express");
const jwt = require("jsonwebtoken");
const prisma = require("../lib/prisma");

const router = express.Router();

const JWT_SECRET =
    process.env.JWT_SECRET || "foodnow_secret_2026";


function autenticar(req, res, next) {

    const authorization =
        req.headers.authorization;

    if (!authorization) {

        return res.status(401).json({
            error: "Token não informado."
        });

    }

    const partes =
        authorization.split(" ");

    if (
        partes.length !== 2 ||
        partes[0] !== "Bearer"
    ) {

        return res.status(401).json({
            error: "Token inválido."
        });

    }

    try {

        const payload =
            jwt.verify(
                partes[1],
                JWT_SECRET
            );

        req.usuario = payload;

        next();

    } catch (error) {

        return res.status(401).json({
            error: "Token inválido ou expirado."
        });

    }

}


/*
========================================
CRIAR PEDIDO
POST /orders
========================================
*/

router.post(
    "/orders",
    autenticar,
    async (req, res) => {

        try {

            const {
                items
            } = req.body;


            if (
                !Array.isArray(items) ||
                items.length === 0
            ) {

                return res.status(400).json({

                    error:
                        "O pedido precisa ter pelo menos um produto."

                });

            }


            let total = 0;

            const itensPedido = [];


            for (
                const item of items
            ) {

                const produto =
                    await prisma.product.findUnique({

                        where: {
                            id: Number(
                                item.productId
                            )
                        }

                    });


                if (!produto) {

                    return res.status(404).json({

                        error:
                            "Produto não encontrado."

                    });

                }


                const quantidade =
                    Number(
                        item.quantity
                    );


                if (
                    !quantidade ||
                    quantidade <= 0
                ) {

                    return res.status(400).json({

                        error:
                            "Quantidade inválida."

                    });

                }


                const subtotal =
                    produto.price *
                    quantidade;


                total += subtotal;


                itensPedido.push({

                    productId:
                        produto.id,

                    quantity:
                        quantidade,

                    price:
                        produto.price

                });

            }


            const pedido =
                await prisma.order.create({

                    data: {

                        status:
                            "PENDENTE",

                        total:
                            total,

                        userId:
                            req.usuario.id,

                        items: {

                            create:
                                itensPedido

                        }

                    },

                    include: {

                        items: {

                            include: {

                                product: true

                            }

                        }

                    }

                });


            res.status(201).json({

                message:
                    "Pedido criado com sucesso.",

                order:
                    pedido

            });


        } catch (error) {

            console.error(
                "ERRO AO CRIAR PEDIDO:",
                error
            );


            res.status(500).json({

                error:
                    "Erro ao criar pedido.",

                details:
                    error.message

            });

        }

    }
);


/*
========================================
MEUS PEDIDOS
GET /orders
========================================
*/

router.get(
    "/orders",
    autenticar,
    async (req, res) => {

        try {

            const pedidos =
                await prisma.order.findMany({

                    where: {

                        userId:
                            req.usuario.id

                    },

                    orderBy: {

                        id:
                            "desc"

                    },

                    include: {

                        items: {

                            include: {

                                product: true

                            }

                        }

                    }

                });


            res.json(pedidos);


        } catch (error) {

            console.error(
                "ERRO AO BUSCAR PEDIDOS:",
                error
            );


            res.status(500).json({

                error:
                    "Erro ao buscar pedidos.",

                details:
                    error.message

            });

        }

    }
);


/*
========================================
BUSCAR PEDIDO
GET /orders/:id
========================================
*/

router.get(
    "/orders/:id",
    autenticar,
    async (req, res) => {

        try {

            const id =
                Number(
                    req.params.id
                );


            const pedido =
                await prisma.order.findFirst({

                    where: {

                        id: id,

                        userId:
                            req.usuario.id

                    },

                    include: {

                        items: {

                            include: {

                                product: true

                            }

                        }

                    }

                });


            if (!pedido) {

                return res.status(404).json({

                    error:
                        "Pedido não encontrado."

                });

            }


            res.json(pedido);


        } catch (error) {

            console.error(
                "ERRO AO BUSCAR PEDIDO:",
                error
            );


            res.status(500).json({

                error:
                    "Erro ao buscar pedido."

            });

        }

    }
);


/*
========================================
ALTERAR STATUS
PUT /orders/:id/status
========================================
*/

router.put(
    "/orders/:id/status",
    autenticar,
    async (req, res) => {

        try {

            const id =
                Number(
                    req.params.id
                );


            const {
                status
            } = req.body;


            const statusPermitidos = [

                "PENDENTE",

                "PREPARANDO",

                "ENTREGUE",

                "CANCELADO"

            ];


            if (
                !statusPermitidos.includes(
                    status
                )
            ) {

                return res.status(400).json({

                    error:
                        "Status inválido."

                });

            }


            const pedido =
                await prisma.order.update({

                    where: {
                        id: id
                    },

                    data: {

                        status:
                            status

                    }

                });


            res.json({

                message:
                    "Status atualizado com sucesso.",

                order:
                    pedido

            });


        } catch (error) {

            console.error(
                "ERRO AO ALTERAR STATUS:",
                error
            );


            res.status(500).json({

                error:
                    "Erro ao alterar status.",

                details:
                    error.message

            });

        }

    }
);

/*
========================================
PEDIDOS DO RESTAURANTE
GET /restaurants/:restaurantId/orders
========================================
*/

router.get(
    "/restaurants/:restaurantId/orders",
    autenticar,
    async (req, res) => {

        try {

            const restaurantId =
                Number(
                    req.params.restaurantId
                );


            const pedidos =
                await prisma.order.findMany({

                    where: {

                        items: {

                            some: {

                                product: {

                                    restaurantId:
                                        restaurantId

                                }

                            }

                        }

                    },

                    orderBy: {

                        id: "desc"

                    },

                    include: {

                        user: {

                            select: {

                                id: true,

                                name: true,

                                email: true

                            }

                        },

                        items: {

                            include: {

                                product: true

                            }

                        }

                    }

                });


            res.json(pedidos);


        } catch (error) {

            console.error(
                "ERRO AO BUSCAR PEDIDOS DO RESTAURANTE:",
                error
            );


            res.status(500).json({

                error:
                    "Erro ao buscar pedidos do restaurante.",

                details:
                    error.message

            });

        }

    }
);

module.exports = router;