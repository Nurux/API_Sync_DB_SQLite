const express = require('express');
const router = express.Router();

const { db } = require('../database/db');

const Login = require('../middleware/Mid_login');

//Todos os Projetos
router.get('/all_projects', Login, (req, res) => {
    const projetos = db.prepare('SELECT * FROM Projeto').all();

    res.json(projetos);
});

//Cadastrar Projeto
router.post('/cadastro', Login, (req, res) => {
    const data = req.body.name_project;

    if (!data) {
        return res.status(401).send({
            error: 'BAD REQUEST',
            msg: 'Credenciais Inválidas'
        })
    }

    // Prepara o INSERT
    const insert = db.prepare(`
        INSERT INTO Projeto (nome_project)
        VALUES (?)
    `);

    // Executa a inserção
    try {
        const result = insert.run(data);

        return res.status(201).send({
            msg: 'Projeto Gerado',
            content: result
        })
    } catch (error) {
        return res.status(505).send({
            msg: 'Erro no Banco',
            content: error
        })
    }

});

//Excluir Projeto
router.delete('/delete', Login, (req, res) => {
    const id_del = req.body.id_project;

    if (!id_del) {
        res.status(400).send({
            msg: 'BAD_REQUEST'
        })
    }

    const delet = db.prepare('DELETE FROM Projeto WHERE id_project = ?');

    try {
        const result = delet.run(id_del);

        return res.status(201).send({
            msg: 'Projeto Excluido',
            content: result
        })
    } catch (error) {
        return res.status(505).send({
            msg: 'Erro no Banco',
            content: error
        })
    }

})

module.exports = router;