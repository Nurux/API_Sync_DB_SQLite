const express = require('express');
const app = express();
const port = 3000;

const rota_user = require('./routes/Usuario');

app.use(express.json());

app.use('/usuarios', rota_user);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Exemplo de app escutando na porta ${port}`);
});