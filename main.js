const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const rota_user = require('./routes/Usuario');
const rota_login = require('./routes/Login');
const rota_project = require('./routes/Project');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/usuarios', rota_user);
app.use('/login', rota_login);
app.use('/project', rota_project);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});