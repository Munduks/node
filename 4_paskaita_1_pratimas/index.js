const express=require("express");// express modulio importavimas
const cors=require("cors");
const data=require("./data");//importuojam duomenis
const app=express(); //aplikacijos sukurimas

app.use(express.json());
app.use(cors());
const port=3000; //porto () skaicius

//1.Sukurkite bendrinį GET route, kuris paduos visus duomenis.
app.get("/", (req, res)=>{
    res.send(data)
});

//2. Sukurkite dinaminį GET route, kur URL turės automobilio markę ir pagal ją prafiltruos, ir grąžins tik tuos žmones, kurie turi šį automobilį.

app.get("/cars/:model", (req, res) => {
    const model = req.params.model;
    const filteredClients = data.filter(
      (client) => client.car.toLowerCase() === model.toLowerCase()
    );
    res.send(filteredClients);
  });

//3.Sukurkite dinaminį GET route, kuris priims vartotojo id ir pagal jį grąžins atitinkamą vartotojo objektą. Hint: url parametrai visada stringai, o čia id - skaičius, tad reikės konvertuoti.
app.get("/clients/:id", (req, res) => {
    // 1 === "1"
    //number(num)=> sutrumpinta versija   num
    const id = req.params.id; //visada stringas
   const foundClient = data.find((client) => client.id === +id);
      
   res.send(foundClient);
  });

//4 Sukurkite GET route, kuris grąžins visus el. paštus (grąžinamas formatas: ["anb@abc.com", "abc@abc.com", "abc@acb.com]).
app.get("/emails", (reg, res)=>{
  //map is vienos strukturos i kita strukura
    const emails=data.map((client)=>client.email);
    res.send(emails);
});
//5Sukurkite GET route, į kurį pasikreipus, grąžins visų moterų (gender: Female) vardą ir pavardę (formatas: ["Rita Kazlauskaite", "Monika Simaskaite"]).
app.get("/females", (req, res)=>{
    const filterFemales=data.filter((client)=>client.gender==="Female");
    const femalesFullNames=filterFemales.map(
     (female)=>`${female.first_name} ${female.las_name}`   
    );
    res.send(femalesFullNames);
});



app.listen(port, ()=>console.log(`server on port ${port}...`));