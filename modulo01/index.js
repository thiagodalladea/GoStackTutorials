const express = require('express');

const server = express();

server.use(express.json());

//Query params = ?teste=1
//Route params = /users/1
//Request body = { "name": "Thiago", "email": "thiagopdalladea@gmail.com" }

const users = ['Thiago', 'Renato', 'Janice'];

function CheckUserBody (req, res, next) {
  const user = req.body.name;
  if(!user){
    return res.status(400).json({ error: `User name is required`} );
  }
  req.user = user;
  next();
}

function CheckUserInArray (req, res, next) {
  const user = users[req.params.index];
  if(!user) {
    return res.status(400).json({ error: `User does not exists`} );
  }
  req.user = user;
  next();
}

//retorna apenas 1 usuário
server.get('/users/:index', CheckUserInArray, (req, res) => {
  return res.json(req.user);
});

//retorna todos os usuários
server.get('/users', (req, res) => {
  return res.json(users);
});

//adiciona um usuário
server.post('/users', CheckUserBody, (req, res) => {

  users.push(req.user);

  return res.json(users);
});

//edita um usuário
server.put('/users/:index', CheckUserInArray, CheckUserBody, (req, res) => {
  const { index } = req.params;
  users[index] = req.user;
  return res.json(users);
});

//deleta um usuário
server.delete('/users/:index', CheckUserInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  return res.send();
});

server.listen(3000);