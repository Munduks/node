const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(URI);

app.get('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('users')
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.post('/John', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db('ManoDuomenuBaze').collection('users').insertOne({
      name: 'John Smitt',
      email: 'john.smitt@example.com',
      city: 'California',
      income: 5000,
    });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/usersCount', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('users')
      .countDocuments();
    // countDocuments = count, bet count yra deprecated (pasenęs ir nenaudojamas)
    // countDocuments() - grąžina skaičių, kiek yra dokumentų iš viso
    // countDocuments({ product: 'toothbrush' }) - grąžina pagal kriterijų pvz. kiek yra toothbrush
    await con.close();
    // data = 10
    res.send({ count: data }); // grąžinam JSON, todėl reikia objekto ir rakto, nes data yra pvz. 10
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get('/usersCount/John', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('users')
      .countDocuments({ name: 'John Smitt' });
    // countDocuments = count, bet count yra deprecated (pasenęs ir nenaudojamas)
    // countDocuments() - grąžina skaičių, kiek yra dokumentų iš viso
    // countDocuments({ product: 'toothbrush' }) - grąžina pagal kriterijų pvz. kiek yra toothbrush
    await con.close();
    // data = 10
    res.send({ count: data }); // grąžinam JSON, todėl reikia objekto ir rakto, nes data yra pvz. 10
  } catch (error) {
    res.status(500).send(error);
  }
});
// distinct
app.get('/cities', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('users')
      .distinct('city');
    // grąžina unikalias reikšmes, būtinai reikia nurodyti kriterijų
    // t.y. raktą.filtruoja tai kad nurodoma

    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
// aggregate
app.get('/lowestIncome', async (req, res) => {
  // total amount of money spent by each customer - kiek kiekvienas asmuo išleido pinigų
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('users')
      .aggregate([
        { $sort: { income: 1 } }, // mazejimo tvarka
      ])
      .toArray();
    // $group - sugrupuoja, _id: $customer - naudoja unikalų customerį,
    // totalAmount: { $sum: '$total' } - totalAmount raktas su suma kurią sudeda iš $total lauko
    // $sort: { totalAmount: -1 } - sortina mažėjimo tvarka pagal tam tikrą kriterijų: totalAmount
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/orders/productSoldAmount', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('purchase_orders')
      .aggregate([
        { $group: { _id: '$product', totalAmount: { $sum: '$total' } } },
        { $sort: { totalAmount: 1 } },
      ])
      .toArray();
    // $group - sugrupuoja, _id: $product - naudoja unikalų produktą,
    // totalAmount: { $sum: '$total' } - totalAmount raktas su suma kurią sudeda iš $total lauko
    // $sort: { totalAmount: 1 } - sortina didėjimo tvarka pagal tam tikrą kriterijų: totalAmount
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/highestIncome', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('users')
      .aggregate([{ $sort: { income: -1 } }])
      .toArray();
    // $match - atitikmenys,
    // {product:{ $in:['shampoo', 'conditioner', 'mouthwash']}}
    // žiūrima per product; išvardintuos product prizme
    // $group - sugrupuoja, _id: $product - naudoja unikalų produktą,
    // totalAmount: { $sum: '$total' } - totalAmount raktas su suma kurią sudeda iš $total lauko
    // $sort: { totalAmount: 1 } - sortina didėjimo tvarka pagal tam tikrą kriterijų: totalAmount
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/dynamicUsersCount/:name', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db('ManoDuomenuBaze').collection('users');
    // .countDocuments({ name: { $regex: `${name}\\b` } });
    // .countDocuments({ name }); // be regex
    // regex stringas kuris atitaiko taisyklę ir surandą
    // gerai nesuprantu bet chatGPT sugeneravo, veikia... :D
    // $match - atitikmenys,
    // {product:{ $in:['shampoo', 'conditioner', 'mouthwash']}}
    // žiūrima per product; išvardintuos product prizme
    // $group - sugrupuoja, _id: $product - naudoja unikalų produktą,
    // totalAmount: { $sum: '$total' } - totalAmount raktas su suma kurią sudeda iš $total lauko
    // $sort: { totalAmount: 1 } - sortina didėjimo tvarka pagal tam tikrą kriterijų: totalAmount
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('users')
      .insertMany([
        {
          name: 'Alice Smith',
          email: 'alice.smith@example.com',
          city: 'New York',
          income: 6000,
        },
        {
          name: 'Bob Johnson',
          email: 'bob.johnson@example.com',
          city: 'Los Angeles',
          income: 7000,
        },
        {
          name: 'Charlie Brown',
          email: 'charlie.brown@example.com',
          city: 'Chicago',
          income: 4500,
        },
        {
          name: 'David Lee',
          email: 'david.lee@example.com',
          city: 'San Francisco',
          income: 8000,
        },
        {
          name: 'Emily Davis',
          email: 'emily.davis@example.com',
          city: 'Boston',
          income: 5500,
        },
        {
          name: 'Frank Rodriguez',
          email: 'frank.rodriguez@example.com',
          city: 'Miami',
          income: 6500,
        },
        {
          name: 'Grace Kim',
          email: 'grace.kim@example.com',
          city: 'Seattle',
          income: 5000,
        },
        {
          name: 'Henry Nguyen',
          email: 'henry.nguyen@example.com',
          city: 'Houston',
          income: 7500,
        },
        {
          name: 'Isabella Taylor',
          email: 'isabella.taylor@example.com',
          city: 'Washington DC',
          income: 9000,
        },
        {
          name: 'Bob Chen',
          email: 'jack.chen@example.com',
          city: 'San Diego',
          income: 6000,
        },
      ]);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on the ${port}`);
});
