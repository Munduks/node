const express=require("express");// express modulio importavimas
const cors=require("cors");// cors importas
const app=express(); //aplikacijos sukurimas, inicijavimas

app.use(express.json());// kad serveris suprastu apie siunciamus duomenis mums. aplikacija priima duomenis json formatu ir juos apdoroja
app.use(cors());// aplikacija naudoja cors apsauga

const port=3000; //porto (kanalas reikalingas serveriui)

const products=["juice", "milk"];

app.get("/products", (req, res)=>{
    res.send(products);
});

app.post("/products", (req, res)=>{
    const product=req.body.product;
    products.push(product);
    res.send(req.body);
});


app.listen(port, ()=>{
 console.log(`server is running on the ${port}`);
});