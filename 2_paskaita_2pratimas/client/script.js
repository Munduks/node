fetch("http://localhost:3000/products")
    .then((response)=>response.json())
    .then((response)=>{
        const productList=document.querySelector("#products");
        response.forEach(product=>{
            const li =document.createElement("li");
            li.textContent=product;
            productList.append(li);
        });
    });
  

// console.log("hello");
const productButton=document.querySelector("#productButton");
productButton.addEventListener("click", ()=>{
    const product=document.querySelector("input[name='product']").value;
    console.log(product);

    fetch("http://localhost:3000/products", {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({product}),
    })
    .then(() => {
       
        location.reload();
    });
})