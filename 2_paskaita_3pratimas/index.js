const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const port = 3000;

const products = [{ name: "duona", price: 1.2 }];

app.get("/products", (req, res)=>{
    res.send(products);
});

app.post("/products", (req, res)=>{
    const product={name:req.body.name, price:req.body.price};
    products.push(product);
    res.send(req.body);
});


app.listen(port, ()=>{
 console.log(`server is running on the ${port}`);
})