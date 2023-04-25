// Trys būdai susikurti node.js aplikaciją:
// 1. Ranka pasirašyti package.json ir index.js failą, bet reikės susirašyti reikalingus modulius atskirai
// 2. Komanda "npm init", kuri sukurs jums package.json ir index.js failus, bet reikės susirašyti reikalingus modulius atskirai
// 3. Persikopijuoti package.json failą ir index.js failą (prasitrinti nereikalingas eilutes). Užtenka parašyti "npm install", kad surašyti visus modulius


//1. Terminale  pasirasome npm install nodemon
//2. pridedame i package.json faila scripts skilti naują skriptą "dev": "nodemon index.js"
// 3.leidžiama aplikaciją terminale su komanda "npm run dev", run reikalingas, nes komanda sukurta mūsų, o ne sistemiška

console.log( "5 paskaita papildomi moduliai")

const express=require("express");// express modulio importavimas
const cors=require("cors");
const app=express(); //aplikacijos sukurimas

app.use(express.json());
app.use(cors());
const port=3000; //porto () skaicius

const users=[];


app.get("/", (req, res)=>{
    res.send(users)
});

    //pasirenku post is saraso ir spaudziu body skilti.
    //renkames raw ir is text pasirenkame json
//{
   // "id":2,
    //"name:"Akvile"
// }

app.post("/", (req, res)=>{
    const user =req.body;
    users.push(user);
    res.send(user);
});


app.listen(port, ()=>console.log(`server on port ${port}...`));