const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../lib/prisma");

const router = express.Router();

const JWT_SECRET =
    process.env.JWT_SECRET || "foodnow_secret_2026";


// CADASTRO
router.post("/users", async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({
                error:
                    "Nome, email e senha são obrigatórios."
            });

        }

        const usuarioExistente =
            await prisma.user.findUnique({
                where: {
                    email: email
                }
            });

        if (usuarioExistente) {

            return res.status(400).json({
                error:
                    "Este email já está cadastrado."
            });

        }

        const senhaCriptografada =
            await bcrypt.hash(password, 10);

        const usuario =
            await prisma.user.create({

                data: {
                    name: name,
                    email: email,
                    password: senhaCriptografada
                }

            });

        res.status(201).json({

            message:
                "Usuário cadastrado com sucesso.",

            user: {

                id: usuario.id,
                name: usuario.name,
                email: usuario.email

            }

        });

    } catch (error) {

        console.error(
            "ERRO AO CADASTRAR USUARIO:",
            error
        );

        res.status(500).json({

            error:
                "Erro ao cadastrar usuário.",

            details:
                error.message

        });

    }

});


// LOGIN
router.post("/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        if (!email || !password) {

            return res.status(400).json({

                error:
                    "Email e senha são obrigatórios."

            });

        }

        const usuario =
            await prisma.user.findUnique({

                where: {
                    email: email
                }

            });

        if (!usuario) {

            return res.status(401).json({

                error:
                    "Email ou senha inválidos."

            });

        }

        const senhaValida =
            await bcrypt.compare(
                password,
                usuario.password
            );

        if (!senhaValida) {

            return res.status(401).json({

                error:
                    "Email ou senha inválidos."

            });

        }

        const token =
            jwt.sign(

                {
                    id: usuario.id,
                    email: usuario.email
                },

                JWT_SECRET,

                {
                    expiresIn: "7d"
                }

            );

        res.json({

            message:
                "Login realizado com sucesso.",

            token: token,

            user: {

                id: usuario.id,
                name: usuario.name,
                email: usuario.email

            }

        });

    } catch (error) {

        console.error(
            "ERRO AO FAZER LOGIN:",
            error
        );

        res.status(500).json({

            error:
                "Erro ao fazer login.",

            details:
                error.message

        });

    }

});


// LISTAR USUÁRIOS
router.get("/users", async (req, res) => {

    try {

        const usuarios =
            await prisma.user.findMany({

                orderBy: {
                    id: "asc"
                },

                select: {

                    id: true,
                    name: true,
                    email: true,
                    createdAt: true

                }

            });

        res.json(usuarios);

    } catch (error) {

        console.error(
            "ERRO AO BUSCAR USUARIOS:",
            error
        );

        res.status(500).json({

            error:
                "Erro ao buscar usuários."

        });

    }

});


// BUSCAR USUÁRIO
router.get("/users/:id", async (req, res) => {

    try {

        const id =
            Number(req.params.id);

        const usuario =
            await prisma.user.findUnique({

                where: {
                    id: id
                },

                select: {

                    id: true,
                    name: true,
                    email: true,
                    createdAt: true

                }

            });

        if (!usuario) {

            return res.status(404).json({

                error:
                    "Usuário não encontrado."

            });

        }

        res.json(usuario);

    } catch (error) {

        console.error(
            "ERRO AO BUSCAR USUARIO:",
            error
        );

        res.status(500).json({

            error:
                "Erro ao buscar usuário."

        });

    }

});


// ATUALIZAR USUÁRIO
router.put("/users/:id", async (req, res) => {

    try {

        const id =
            Number(req.params.id);

        const {
            name,
            email,
            password
        } = req.body;

        const dados = {};

        if (name) {
            dados.name = name;
        }

        if (email) {
            dados.email = email;
        }

        if (password) {

            dados.password =
                await bcrypt.hash(
                    password,
                    10
                );

        }

        const usuario =
            await prisma.user.update({

                where: {
                    id: id
                },

                data: dados

            });

        res.json({

            message:
                "Usuário atualizado com sucesso.",

            user: {

                id: usuario.id,
                name: usuario.name,
                email: usuario.email

            }

        });

    } catch (error) {

        console.error(
            "ERRO AO ATUALIZAR USUARIO:",
            error
        );

        res.status(500).json({

            error:
                "Erro ao atualizar usuário.",

            details:
                error.message

        });

    }

});


module.exports = router;