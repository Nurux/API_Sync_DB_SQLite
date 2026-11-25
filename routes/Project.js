const express = require('express');
const router = express.Router();

const { db } = require('../database/db');

const Login = require('../middleware/Mid_login');


router.get('/all_projects', Login, (req, res) => {
    res.json('Vamos ter projetos aqui');
})

module.exports = router;