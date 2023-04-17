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
    fetch("http://localhost:3000/", {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({name}),
    })
    .then(() => {
        location.reload();;
    });
    
   
});
 