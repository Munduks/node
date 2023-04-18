//istraukti duomenis ir ataizduoti
fetch("http://localhost:3000/")
    .then((response)=>response.json())
    .then((response)=>{
        const namesList=document.querySelector("#namesId");
        response.forEach(name=>{
            const li =document.createElement("li");
            li.textContent=name;
            namesList.append(li);
        })
    })
    .catch((error)=>{
        console.log(error);
    });

// console.log("hello");
const nameButton=document.querySelector("#nameButton");
nameButton.addEventListener("click", ()=>{
    const name=document.querySelector("input[name='name']").value;
    console.log(name);

    // POST
    // reikia siusti objekta 
    //pridetinauja produkta/duomeni i serveri
    //fetch eina pirma url arba papildomi parametrai
    //palidomi parametrai tai parametru objektas kuris nusako esybes apie mus kreipimasi
    //esybes:method, header, body
    //method- kreipimosi metodas(put, get post delate, )
    // headers - objektas{..} gali buti "Content-Type":"application/json". nurodo kad siunciami duomenys yra JSON formato 
    //body- musu siunciami duomenys, reikia prideti JSON.stringify(data), tam kad serveris suprastu siunciamus duomenis. butnai turi buti JSON formato arba JS objektas pvz:{name:"Raimonda"}
    fetch("http://localhost:3000/", {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({name}),
    })
    .then(() => {
       
        location.reload();; 
        //then - kvietimas ivykdytas. ivykdo .then dali 
        //.then (response)- response dalistai kas grizta is serverio is re.send()

        //location.reload-perkrauti puslapi
    });
    
   
});
 