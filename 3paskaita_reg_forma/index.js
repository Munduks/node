const express=require("express");// express modulio importavimas
const cors=require("cors");// cors importas
const app=express(); //aplikacijos sukurimas, inicijavimas

app.use(express.json());// kad serveris suprastu apie siunciamus duomenis mums. aplikacija priima duomenis json formatu ir juos apdoroja
app.use(cors());// aplikacija naudoja cors apsauga

const port=3000; //porto (kanalas reikalingas serveriui)

const users=[];

app.get("/users", (req, res)=>{
    res.send(users);
});

app.post("/users", (req, res)=>{
    const user=req.body.user;
    users.push(user);
    res.send(req.body);
});
app.listen(port, ()=>{
    console.log(`server is running on the ${port}`);
   });