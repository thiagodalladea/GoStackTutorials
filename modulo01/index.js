const express = require('express');

const server = express();

//Query params = ?teste=1
//Route params = /users/1
//Request body = { "name": "Thiago", "email": "thiagopdalladea@gmail.com" }

server.get('/teste', (req, res) => {
  return res.json({ message: 'Hello World!' });
  });

//req ==> representa todos os dados da requisição
//res ==> representa todas as informações que é preciso para retornar uma resposta para o front-end

server.listen(3000);