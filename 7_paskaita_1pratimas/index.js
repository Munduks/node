const express = require('express'); // express modulio importavimas
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 8080; // ||8080 griztamasis rysys jei PORT bus nerastas
//  process.env tai yra objektas sukurtas is musu .env failo

const app = express(); //  aplikacijos sukurimas
app.use(express.json());
app.use(cors());

const greetings = [];

app.get('/greetings', (req, res) => {
  res.send(greetings);
});

// {id, title, done}
app.post('/greetings', (req, res) => {
  const greeting = req.body;
  const newGreeting = { id: greetings.length + 1, ...greeting }; // pridedamas id prie siunčiamo obj
  greetings.push(newGreeting); // pridedama į masyvą
  res.send(newGreeting); // išsiunčiamas response
});

app.get('/greetings/:id', (req, res) => {
  const id = +req.params.id;
  // randa{...}jei ne undefined
  const foundGreeting = greetings.find((greeting) => greeting.id === id);
  if (foundGreeting) {
    // jeigu randa
    res.send(foundGreeting);
  } else {
    // jeigu neranda - 404 not found
    // res.status() - grąžina statusą
    res.status(404).send({ message: 'Greeting not found' }); // grazina statusa
  }
});
app.delete('/greetings/:id', (req, res) => {
  const id = +req.params.id;
  // randa0-begalybės,neranda-1
  const foundIndex = greetings.findIndex((greeting) => greeting.id === id);
  if (foundIndex !== -1) {
    // jeigu randa
    const deletingGreeting = greetings.find((todo) => todo.id === id);
    greetings.splice(foundIndex, 1);
    res.send(deletingGreeting); // grąžinam elementą kurį trinam
  } else {
    // jeigu neranda
    res.status(404).send({ message: 'Greeting not found' });
  }
});

app.put('/greetings/:id', (req, res) => {
  const id = +req.params.id;
  const foundIndex = greetings.findIndex((greeting) => greeting.id === id);
  if (foundIndex !== -1) {
    const greeting = req.body; // naujai siunčiamas todo
    const updatingGreeting = { id, ...greeting }; // senas id + naujas todo
    greetings.splice(foundIndex, 1, updatingGreeting); // užkeičiamas atnaujintas todo
    res.send(updatingGreeting);
  } else {
    res.status(404).send({ message: 'Todo not found' });
  }
});
app.listen(port, () => console.log(`Server started on port ${port}...`));

// extensions kaireje puseje. rasome prittier ir instaliuojame code formate
