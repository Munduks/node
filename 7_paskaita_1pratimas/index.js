const express = require('express'); // express modulio importavimas
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 8080; // ||8080 griztamasis rysys jei PORT bus nerastas
//  process.env tai yra objektas sukurtas is musu .env failo

const app = express(); //  aplikacijos sukurimas
app.use(express.json());
app.use(cors());

const posts = [];

app.get('/posts', (req, res) => {
  res.send(posts);
});

// {id, title, done}
app.post('/posts', (req, res) => {
  const post = req.body;
  const newPost = { id: posts.length + 1, ...post }; // pridedamas id prie siunčiamo obj
  posts.push(newPost); // pridedama į masyvą
  res.send(newPost); // išsiunčiamas response
});

app.get('/posts/:id', (req, res) => {
  const id = +req.params.id;
  // randa{...}jei ne undefined
  const foundPost = posts.find((post) => post.id === id);
  if (foundPost) {
    // jeigu randa
    res.send(foundPost);
  } else {
    // jeigu neranda - 404 not found
    // res.status() - grąžina statusą
    res.status(404).send({ message: 'Greeting not found' }); // grazina statusa
  }
});
app.delete('/posts/:id', (req, res) => {
  const id = +req.params.id;
  // randa0-begalybės,neranda-1
  const foundIndex = posts.findIndex((post) => post.id === id);
  if (foundIndex !== -1) {
    // jeigu randa
    const deletingPost = posts.find((post) => post.id === id);
    posts.splice(foundIndex, 1);
    res.send(deletingPost); // grąžinam elementą kurį trinam
  } else {
    // jeigu neranda
    res.status(404).send({ message: 'Greeting not found' });
  }
});

app.put('/posts/:id', (req, res) => {
  const id = +req.params.id;
  const foundIndex = posts.findIndex((post) => post.id === id);
  if (foundIndex !== -1) {
    const post = req.body; // naujai siunčiamas todo
    const updatingPost = { id, ...post }; // senas id + naujas todo
    posts.splice(foundIndex, 1, updatingPost); // užkeičiamas atnaujintas todo
    res.send(updatingPost);
  } else {
    res.status(404).send({ message: 'Todo not found' });
  }
});
app.listen(port, () => console.log(`Server started on port ${port}...`));

// extensions kaireje puseje. rasome prittier ir instaliuojame code formate
