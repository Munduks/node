const form=document.querySelector("form");
form.addEventListener("submit", (e)=>{
 e.preventDefault();

 const passwordInput=document.querySelector("input[name='password']").value;
 const repeatPassword=document.querySelector("input[name='password2']").value;
 if(passwordInput===repeatPassword){
    const password=passwordInput;
    const email=document.querySelector("input[name='email']").value;
    const name=document.querySelector("input[name='name']").value;
    const surname=document.querySelector("input[name='surname']").value;
    const address=document.querySelector("input[name='address']").value;
    const postcode=document.querySelector("input[name='postCode']").value;
    const city=document.querySelector("input[name='city']").value;
    const phone=document.querySelector("input[name='phone']").value;
    const agree=document.querySelector("checkbox").value;
 }
}
)
fetch("http://localhost:3000/users")
    .then((response)=>response.json())
    .then((response)=>{
        const userInfo=document.querySelector("#dataForm");
        response.forEach(user=>{
            const li =document.createElement("li");
            li.textContent=user;
            userInfo.append(li);
        });
    });
    const formBtn = document.querySelector("#registrationForm");
    formtBtn.addEventListener("click", () => {
      
      
      

    
      fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: product, price: price }), // siunciamas JSON formatu body
      }).then(() => {
        location.reload();
      });
    });