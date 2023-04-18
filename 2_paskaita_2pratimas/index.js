const express=require("express");// express modulio importavimas
const cors=require("cors");// cors importas
const app=express(); //aplikacijos sukurimas, inicijavimas

app.use(express.json());// kad serveris suprastu apie siunciamus duomenis mums. aplikacija priima duomenis json formatu ir juos apdoroja
app.use(cors());// aplikacija naudoja cors apsauga

const port=3000; //porto (kanalas reikalingas serveriui)










app.listen(port, ()=>{
 console.log(`server i running on the ${port}`);
});