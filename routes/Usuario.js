const argon2 = require('argon2');

const express = require('express');
const router = express.Router();

const { db } = require('../database/db');
const { randomUUID } = require('crypto');



//Lista todos os usuarios
router.get('/todos', (req, res) => {
    const usuarios = db.prepare('SELECT * FROM Usuario').all();

    res.json(usuarios);
});

//Lista o usuario pelo id
router.get('/:publicId', (req, res) => {
    const usuario = db.prepare(`
        SELECT public_id, nome
        FROM Usuario
        WHERE public_id = ?
    `).get(req.params.publicId);

    if (!usuario) {
        return res.status(404).json({
            erro: 'Usuário não encontrado'
        });
    }

    res.json(usuario);
});


router.post('/cadastro', async (req, res) => {
    try {
        const user_json = req.body.user;

        if (!user_json) {
            return res.status(400).json({
                erro: 'BAD REQUEST',
                msg: 'Body inválido'
            });
        }

        const { nome, senha } = user_json;

        if (!nome || !senha) {
            return res.status(400).json({
                erro: 'BAD REQUEST',
                msg: 'Nome e senha são obrigatórios'
            });
        }

        const publicId = randomUUID();

        // Gera o hash da senha
        const hash = await argon2.hash(senha, {
            type: argon2.argon2id
        });

        // Prepara o INSERT
        const insert = db.prepare(`
            INSERT INTO Usuario (public_id, nome, senha)
            VALUES (?, ?, ?)
        `);

        // Executa a inserção
        const result = insert.run(publicId, nome, hash);

        return res.status(201).json({
            mensagem: 'Usuário criado com sucesso!',
            public_id: publicId,
            resultado: result.lastInsertRowid
        });
        
        console.log('Resultado');
        console.log(result);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: 'INTERNAL SERVER ERROR',
            msg: 'Erro ao cadastrar usuário'
        });
    }
});

module.exports = router;