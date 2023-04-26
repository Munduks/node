const express=require("express");// express modulio importavimas
const cors=require("cors");
const app=express(); //aplikacijos sukurimas

app.use(express.json());
app.use(cors());
const port=3000; //porto () skaicius


//const- negalima priskirti naujos reiksmes
const cart=[];


app.get("/cart", (req, res)=>{
    res.send(cart)
});

app.post("/cart", (req, res)=>{
    const item =req.body;
    item.id=cart.length + 1;//pridedamas dinaminis id pagal krepselio ilgi. ilgis +1
    cart.push(item);
    //status- grazina http statusa kuris nurodo response busena
    res.status(201).send(item);
});

app.get("/cart/:id",(req,res)=>{
    const item= cart.find((item)=>item.id=== +req.params.id);
    if(!item){
        res.status(404).send("item  not found");
    }else{
        res.send(item);
    } 
})

app.listen(port, ()=>console.log(`server on port ${port}...`));