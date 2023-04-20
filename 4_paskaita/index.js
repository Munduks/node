console.log( "ketvirta paskaita dinaminiai linkai")

const express=require("express");// express modulio importavimas
const cors=require("cors");
const app=express(); //aplikacijos sukurimas

app.use(express.json());
app.use(cors());
const port=3000; //porto () skaicius

const cars ={
    bmw:["13", "18", "1 series", "3 series", "5 series"],
    mb:["a class", "c class", "e class", "s class"],
    vw:["golf", "arteon", "up"],
}
//abi eilutes daro ta pati - console.log(cars.bmw) ir console.log(cars["bmw"]);

// app.get("/bmw", (req, res)=>{
//     res.send(["13", "18", "1 series", "3 series", "5 series"]);
// });

//  app.get ("/audi", (req, res)=>{
//     res.send(["A3", "A4","A6"]);
//  });
//dinaminis linkas  taskuris prasideda su :(dvitaskiu)
 app.get("/cars/:model", (req, res)=>{
    //req.params - requesto parametrai
    //jeigu nrime paiekti dinamini linka turime naudoti toki pati pabadinima pvx:model butu req.params.model
    const model=req.params.model; //model=bmw
    res.send(cars[model]);// dinamiskai istraukti duomenys
 });


 app.listen(port, ()=>console.log(`server on port ${port}...`));

 ///http://localhost:3000/cars/bmw  taip vesti norint pamatyti serveri