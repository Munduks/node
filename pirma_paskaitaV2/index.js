const express=require("express");// express modulio importavimas
const app=express(); //aplikacijos sukurimas
const port=3000; //porto () skaicius

//routas (kelio ) route/path paleidimas
//get -grazink duomenis
app.get("/",(req, res)=>{
    //req-request(kas ateina is isores), res- (kas ateina is vidaus)
    res.send("mano vardas yra Raimonda");//send metodas issiuncia duomenis
});

app.get("/today", (req, res)=>{
    res.send(new Date().toDateString());
});

app.get("/user", (req, res)=>{
    const user={
        name:"Raimonda",
        surname:"Stonkute", 
        age:32,
    };
    res.send(user);
})

//serverio paleidimas
app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
});