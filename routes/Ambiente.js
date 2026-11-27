const express = require('express');
const router = express.Router();

const { db } = require('../database/db');

const Login = require('../middleware/Mid_login');

router.get('/all/:id_project', Login, (req, res) => {
    const id = req.params.id_project

    if (!id) {
        return res.status(400).send({
            error: 'BAD_REQUEST'
        });
    }

    const select = db.prepare("SELECT * FROM Ambiente WHERE id_project = ?").all(id);

    return res.status(201).json({
        mensagem: 'Ambientes',
        resultado: select
    });

});

router.post('/cadastro', Login, (req, res) => {
    const { name, type, adress, password, id_project } = req.body?.evironmnet ?? {};
    
    if (!name || !password || !type || !adress || !id_project) {
        return res.status(400).json({
            erro: 'BAD REQUEST',
            msg: 'Body inválido'
        });
    }

    const insert = db.prepare('INSERT INTO Ambiente (name_environment, type_environment, adress_environment, password_environment, id_project) VALUES(?,?,?,?,?)')
    const result = insert.run(name, type, adress, password, id_project);

    return res.status(201).send({
        msg: 'Ambiente Cadastrado com Sucesso',
        resultado: result
    })

});

module.exports = router;