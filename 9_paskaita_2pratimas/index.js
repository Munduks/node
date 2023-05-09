// npm install nodemon --save-dev - įrašo į devDependencies
// --save-dev flagas
// devDependencies - tai moduliai, be kurių mūsų aplikacija veiktų,
// tačiau jie yra padedantys developinimui

// DB - database - duomenų baszė
// .find().toArray() - grąžiną visus dokumentus iš kolekcijos
// .insertOne(item) - prideda vieną dokumentą į kolekciją

const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb'); // butinai inportuoti is mongodb
require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;
// Prisijungimo prie mūsų DB linkas
// galima rasti mongodb.com ant klasterio "Connect" mygtukas ir Drivers skiltis

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(URI); // MongoDB instance

// async funkcija, kad galėtume naudoti await prisijungiat prie DB
app.get('/products', async (req, res) => {
  try {
    const con = await client.connect(); // prisijungiame prie duomenų bazės
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('Products')
      .find()
      .toArray(); // išsitraukiame duomenis iš duomenų bazęs
    await con.close(); // uždarom prisijungimą prie duomenų bazės
    res.send(data);
  } catch (error) {
    // 500 statusas - internal server error - serveris neapdorojo arba nežino kas per klaida
    res.status(500).send(error);
  }
});
// istraukimas pagal id
app.get('/products/:id', async (req, res) => {
  try {
    // destrukcija is objekto const id
    const { id } = req.params;
    const con = await client.connect(); // prisijungiame prie duomenų bazės
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('Products')
      .findOne(new ObjectId(id)); // suranda viena objekta duomenu bazeje
    // butinai importuoti ObjectId iš mongodb
    await con.close(); // uždarom prisijungimą prie duomenų bazės
    res.send(data);
  } catch (error) {
    // 500 statusas - internal server error - serveris neapdorojo arba nežino kas per klaida
    res.status(500).send(error);
  }
});

app.get('/products/category/:type', async (req, res) => {
  try {
    // destrukcija is objekto const id
    const { type } = req.params;
    const con = await client.connect(); // prisijungiame prie duomenų bazės
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('Products')
      .find({ category: type }) // istraukia pagal tam tikra lauka pvz:genre
      .toArray();
    // butinai importuoti ObjectId iš mongodb
    await con.close(); // uždarom prisijungimą prie duomenų bazės
    res.send(data);
  } catch (error) {
    // 500 statusas - internal server error - serveris neapdorojo arba nežino kas per klaida
    res.status(500).send(error);
  }
});
// asc- ascending - didejimo tvarka 1
// dsc - descending - mazejimo tvarka -1
app.get('/products/priceSort/:type', async (req, res) => {
  try {
    // destrukcija is objekto const id. Sort tik didejimo arba mazejimo tvarka
    const { type } = req.params;
    const sort = type === 'asc' ? 1 : -1;
    const con = await client.connect(); // prisijungiame prie duomenų bazės
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('Products')
      .find()
      .sort({ price: sort }) // sortina pagal didejimo mazejimo tvarka
      .toArray();
    // butinai importuoti ObjectId iš mongodb
    await con.close(); // uždarom prisijungimą prie duomenų bazės
    res.send(data);
  } catch (error) {
    // 500 statusas - internal server error - serveris neapdorojo arba nežino kas per klaida
    res.status(500).send(error);
  }
});

app.post('/products', async (req, res) => {
  try {
    const product = req.body;
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('Products')
      .insertOne(product); // prideda vieną objektą
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on the ${port} port`);
});
