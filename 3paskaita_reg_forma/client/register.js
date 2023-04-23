const form=document.querySelector("form");
form.addEventListener("submit", (e)=>{
 e.preventDefault();

 const passwordInput=document.querySelector("input[name='password']").value;
 const repeatPassword=document.querySelector("input[name='password2']").value;
 if(passwordInput===repeatPassword){
    const password=passwordInput;
    const email=document.querySelector("input[name='email']").value;
    const firstname=document.querySelector("input[name='name']").value;
    const surname=document.querySelector("input[name='surname']").value;
    const address=document.querySelector("input[name='address']").value;
    const postcode=document.querySelector("input[name='postCode']").value;
    const city=document.querySelector("input[name='city']").value;
    const phone=document.querySelector("input[name='phone']").value;
    const agree=document.querySelector("#agreement").checked;
 
fetch("http://localhost:3000/users", {
  method:"POST",
  headers:{"Content=Type":"application/json"},
  body:JSON.stringify({
password,
email,
firstname,
surname,
address,
postcode,
city,
phone,
agree,
  }),
})
  .then(()=>{
  window.open("index.html", "_blank");//atidaro naujam tabe index.html puslapi
  })
  .catch((error)=>console.log(error));
  form.reset();
 }else{
    alert("Nesutampa slaptadzodis, suveskite is naujo!");
}
});
