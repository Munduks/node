const express = require("express"); // express modulio importavimas
const cors = require("cors");

require("dotenv").config();

const app = express(); //  aplikacijos sukurimas

app.use(express.json());
app.use(cors());
//  process.env tai yra objektas sukurtas is musu .env failo
const port = process.env.PORT || 8080; // ||8080 griztamasis rysys jei PORT bus nerastas

const tickets = [];

app.get("/tickets", (req, res) => {
  res.send(tickets);
});

app.post("/tickets", (req, res) => {
  const item = req.body;
  item.id = tickets.length + 1; // pridedamas dinaminis id pagal krepselio ilgi. ilgis +1
  tickets.push(item);
  // status- grazina http statusa kuris nurodo response busena
  res.status(201).send(item);
});
app.listen(port, () => console.log(`server on port ${port}...`));

// extensions kaireje puseje. rasome prittier ir instaliuojame code formate
