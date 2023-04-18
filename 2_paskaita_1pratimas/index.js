const express=require("express");// express modulio importavimas
const cors=require("cors");// cors importas
const app=express(); //aplikacijos sukurimas, inicijavimas

app.use(express.json());// kad serveris suprastu apie siunciamus duomenis mums. aplikacija priima duomenis json formatu ir juos apdoroja
app.use(cors());// aplikacija naudoja cors apsauga

const port=3000; //porto (kanalas reikalingas serveriui)

const cars =["peugeot"];

//get kelias kuris grazina duomenis
app.get("/", (req, res)=>{
    //res - response duomenys kuriuos mes graziname
    res.send(cars)// res.send()- metodas grazinantis klientui atsakyma
});
app.post("/", (req, res)=>{
    //request (req)- duomenys kuriuos mes gauname is isores
    //req.body - pagrindiniai duomenys is isores
    const car=req.body.car;

    cars.push(car);
    res.send(req.body);//post dalyje siunciame agal klientui tai ka jis atsiunte mums
})

// app.listen-metodas paleidzia klausytis serverio nurodytu kanalu
//port- kanalas
//()=>{}- funkcija kuri pasileidzia, kai serveris  startuoja
//console.log- naudojama kd zinoti kokiu kanalu paleid serveri
app.listen(port, ()=>{
    console.log(`Server is running on the http://localhost:${port}/`);
});