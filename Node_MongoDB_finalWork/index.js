const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;
// const dbName = process.env.DB_NAME;

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(URI);

app.get('/memberships', async (req, res) => {
  try {
    const con = await client.connect(); // prisijungiame prie duomenų bazės
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('services')
      .find()
      .toArray(); // išsitraukiame duomenis iš duomenų bazęs
    await con.close(); // uždarom prisijungimą prie duomenų bazės
    res.send(data);
  } catch (error) {
    // 500 statusas - internal server error - serveris neapdorojo arba nežino kas per klaida
    res.status(500).send(error);
  }
});

app.post('/memberships', async (req, res) => {
  try {
    const service = req.body;
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('services')
      .insertOne(service);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/memberships/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('services')
      .deleteOne({ _id: new ObjectId(id) }); // ištrina vieną
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/users/:order', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('Users')
      .aggregate([
        {
          $lookup: {
            from: 'services', // kita kolekcija, su kuria jungiamasi
            localField: '_id', // laukas iš users kolekcijos per kuri susijungia
            foreignField: 'service_id', // laukas iš comments kolekcijos per kuri pazysta
            as: 'service_id', // išeigos masyvo laukas
          },
        },
        {
          $unwind: '$user_name', // išplečia masyvą, kad kiekvienas elementas būtų atskiras dokumentas
        },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on the ${port}`);
});
