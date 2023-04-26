//  dazniausia naudojamos aplinkos:develoment aplinka(pas mus),
//  testing, preprod(versija pries galutine) ir production(galutine versija kuria mato klientai)

// console.log('6 paskaita ');

const express = require('express'); // express modulio importavimas
const cors = require('cors');

require('dotenv').config();

const app = express(); //  aplikacijos sukurimas

app.use(express.json());
app.use(cors());
//  process.env tai yra objektas sukurtas is musu .env failo
const port = process.env.PORT || 8080; // ||8080 griztamasis rysys jei PORT bus nerastas

app.get('/', (req, res) => {
  res.send();
});

app.listen(port, () => console.log(`server on port ${port}...`));

// extensions kaireje puseje. rasome prittier ir instaliuojame code formate
