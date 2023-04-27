const express = require('express'); // express modulio importavimas
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 8080; // ||8080 griztamasis rysys jei PORT bus nerastas
//  process.env tai yra objektas sukurtas is musu .env failo

const app = express(); //  aplikacijos sukurimas
app.use(express.json());
app.use(cors());

const todos = [];

app.get('/todos', (req, res) => {
  res.send(todos);
});

// {id, title, done}
app.post('/todos', (req, res) => {
  const todo = req.body;
  const newTodo = { id: todos.length + 1, ...todo }; // pridedamas id prie siunciamo objekto
  todos.push(newTodo); // pridedam i masyva
  res.send(newTodo); // isiunciamas response
});

app.get('/todos/:id', (req, res) => {
  const id = +req.params.id;
  const foundTodo = todos.find((todo) => todo.id === id);
  if (foundTodo) {
    // jeigu randa
    res.send(foundTodo);
  } else {
    // jeigu neranda-404 not found
    // res.status()- grazina statusa
    res.status(404).send({ message: 'To do not found' }); // grazina statusa
  }
});

app.delete('/todos/:id', (req, res) => {
  const id = +req.params.id;
  const foundIndex = todos.findIndex((todo) => todo.id === id); // randa  0-begalybes , neranda -1
  if (foundIndex !== -1) {
    // jeigu randa
    const delatingTodo = todos.find((todo) => todo.id === id);
    todos.splice(foundIndex, 1);
    res.send(delatingTodo); // grazinam elementa kuri trinam
  } else {
    // jeigu neranda
    res.status(404).send({ message: 'Todo not found' });
  }
});

app.put('/todos/id', (req, res) => {
  const id = +req.params.id;
  const foundIndex = todos.findIndex((todo) => todo.id === id);
  if (foundIndex !== -1) {
    const todo = req.body; // naujai siunciamas todo
    const updatingTodo = { id, ...todo }; // senas id +naujas todo
    todos.splice(foundIndex, 1, updatingTodo); // keiciamas atnaujintas todo
    res.send(updatingTodo);
  } else {
    res.status(404).send({ message: 'Todo not found' });
  }
});

app.listen(port, () => console.log(`server on port ${port}...`));

// extensions kaireje puseje. rasome prittier ir instaliuojame code formate
