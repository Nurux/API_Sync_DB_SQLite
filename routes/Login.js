const argon2 = require('argon2');

const express = require('express');
const router = express.Router();

const { db } = require('../database/db');

const jwt = require('jsonwebtoken');

//Fazer Login
router.post('/', async (req, res) => {
    const { name, password } = req.body ?? {};

    if (!name || !password) {
        return res.status(400).json({
            erro: 'BAD REQUEST',
            msg: 'Body inválido'
        });
    }

    const query = db.prepare('SELECT id, public_id, senha FROM Usuario WHERE nome = ?').get(name);

    if (!query) {
        return res.status(401).json({
            erro: 'UNAUTHORIZED',
            msg: 'Usuário ou senha inválidos'
        });
    }

    const validPassword = await argon2.verify(
        query.senha,
        password
    );

    if (!validPassword) {
        return res.status(401).json({
            erro: 'UNAUTHORIZED',
            msg: 'Usuário ou senha inválidos'
        });
    }

    const token = jwt.sign(
        { id: query.public_id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return res.status(200).json({
        msg: 'Logado',
        token: token
    });

})

module.exports = router;