const express=require("express");// express modulio importavimas
const cors=require("cors");
const data=require("./data");//importuojam duomenis
const app=express(); //aplikacijos sukurimas

app.use(express.json());
app.use(cors());
const port=3000; //porto () skaicius
// 1.Sukurkite bendrinį GET route, kuris paduos visus prekių duomenis.

app.get("/", (req, res)=>{
    res.send(data)
});

//2. Sukurkite dinaminį GET route, kur URL turės prekės kategoriją, ir pagal ją prafiltruos,bei grąžins tik tuos produktus, kurie priklauso šiai kategorijai.
app.get("/categories/:model", (req, res) => {
    const model = req.params.model;
    const filteredCategory = data.filter(
      (client) => client.category.toLowerCase() === model.toLowerCase());
    res.send(filteredCategory);
  });

//   3.Sukurkite dinaminį GET route, kuris priims prekės id ir pagal jį grąžins atitinkama prekės objektą. Hint: url parametrai visada stringai, o čia id - skaičius, tad reikės konvertuoS.
app.get("/products/:id", (req, res) => {
    // 1 === "1"
      const id = req.params.id;
   const foundProduct = data.find((client) => client.id === +id);
   res.send(foundProduct);
  });

//   4.Sukurkite GET route, kuris grąžins visų prekių pavadinimus (grąžinamas formatas: ["iPhone 13", "Samsung Galaxy S22", "Dell XPS 15", "MacBook Pro", "Sony WH-1000XM4", "Bose QuietComfort 35 II"]).
app.get("/names", (reg, res)=>{
    const names=data.map((client)=>client.name);
    res.send(names);
});

// 5.Sukurkite GET route, į kurį pasikreipus, grąžins visų prekių, kurių kiekis sandėlyje yra mažesnis už nurodytą kiekį, pavadinimus ir likug (formatas: [{"name": "Samsung Galaxy S22", "stock": 5}, {"name": "Dell XPS 15", "stock": 3}]).
app.get("/females", (req, res)=>{
    const filterFemales=data.filter((client)=>client.gender==="Female");
    const femalesFullNames=filterFemales.map(
     (female)=>`${female.first_name} ${female.las_name}`   
    );
    res.send(femalesFullNames);
});

app.listen(port, ()=>console.log(`server on port ${port}...`));