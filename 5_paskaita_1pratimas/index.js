const express=require("express");// express modulio importavimas
const cors=require("cors");
const app=express(); //aplikacijos sukurimas

app.use(express.json());
app.use(cors());
const port=3000; //porto () skaicius

const carts=[
    {
        "id": 1,
        "name": "sūris",
        "price": 1.5,
        "quantity": 2
    },
    {
        "id": 2,
        "name": "pienas",
        "price": 1.9,
        "quantity": 19
    },
    {
        "id": 3,
        "name": "miltai",
        "price": 2,
        "quantity": 12
    }
];


app.get("/cart", (req, res)=>{
    res.send(carts)
});

app.post("/cart", (req, res)=>{
    const cart =req.body;
    carts.push(cart);
    res.send(cart);
});

app.get("/cart/item/:id",(req,res)=>{
    const id = (req.params.id);
    const foundItem = data.find((carts) => carts.id === +id);
    res.send(foundItem); 
})

app.listen(port, ()=>console.log(`server on port ${port}...`));