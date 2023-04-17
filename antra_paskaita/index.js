console.log("antra paskaita front + backend")

const express=require("express");// express modulio importavimas
const cors=require("cors");
const app=express(); //aplikacijos sukurimas

app.use(express.json());
app.use(cors());
const port=3000; //porto () skaicius


const names=["Raimonda"];

app.get("/", (req, res)=>{
    res.send(names)
});
app.post("/",(req, res)=>{
const name=req.body.name;

names.push(name);
res.send(req.body);
});

app.listen(port, ()=>{
console.log(`server i running on the ${port}`);
    });