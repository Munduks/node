fetch("http://localhost:3000/products")
  .then((response) => response.json())
  .then((response) => {
    const productList = document.querySelector("#products");
    response.forEach((product) => {
      const li = document.createElement("li");
      li.textContent = product;
      productList.append(li);
    });
  });

// console.log("hello");
const productButton = document.querySelector("#productButton");
productButton.addEventListener("click", () => {
  const product = document.querySelector("input[name='product']").value;
  console.log(product);

  // fetch(serverio URL, papildomi parametrai) <- struktūra
  // serverio URL - adresas iki serverio
  // papildomi parametrai - tai parametrų objektas, kuris nusako esybes apie mūsų kreipimąsį
  // esybės: method, headers, body
  // method - kreipimosi metodas, gali būti pvz: "POST", "PUT", "DELETE", "GET" (defaultinis)
  // headers - objektas {...}, gali būti {"Content-Type": "application/json"} - nurodo, kad siunčiami duomenys yra JSON formato
  // body - mūsų siunčiami duomenys, reikia pridėti JSON.stringify(data) tam, kad serveris suprastų siunčiamus duomenis. Būtinai turi būti JSON formato aka Javascript Object pvz. Pvz: {name: "Rokas", surname: "Andreikenas"}

  fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product }),
  })
    // .then() kai kvietimas įvykdytas, įvykdo .then() dalį
    // .then(response)  - response dalis, tai kas grįžta iš serverio iš res.send()

    .then((resp) => resp.json())
    .then((response) => {
      console.log(response);

      // perkrauti puslapį
      location.reload();
    });
});
