// const form=document.querySelector("form");
// form.style.textDecoration="bold";
fetch("http://localhost:3000/users")
    .then((response)=>response.json())
    .then((response)=>{
        const userInfo=document.querySelector("#dataForm");
        response.forEach(product=>{
            const li =document.createElement("li");
            li.textContent=product;
            userInfo.append(li);
        });
    });
  