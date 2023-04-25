const express=require("express");// express modulio importavimas
const cors=require("cors");
const data=require("./data");//importuojam duomenis
const app=express(); //aplikacijos sukurimas

app.use(express.json());
app.use(cors());
const port=3000; //porto () skaicius
// 1.Sukurkite bendrinį GET route, kuris paduos visus prekių duomenis.

app.get("/", (req, res)=>{
    res.send(data)
});

//2. Sukurkite dinaminį GET route, kur URL turės prekės kategoriją, ir pagal ją prafiltruos,bei grąžins tik tuos produktus, kurie priklauso šiai kategorijai.
app.get("/categories/:model", (req, res) => {
    const model = req.params.model;
    const filteredCategory = data.filter(
      (products) => products.category.toLowerCase() === model.toLowerCase());
    res.send(filteredCategory);
  });

//   3.Sukurkite dinaminį GET route, kuris priims prekės id ir pagal jį grąžins atitinkama prekės objektą. Hint: url parametrai visada stringai, o čia id - skaičius, tad reikės konvertuoS.
app.get("/products/:id", (req, res) => {
    // 1 === "1"
      const id = req.params.id;
   const foundProduct = data.find((products) => products.id === +id);
   res.send(foundProduct);
  });

//   4.Sukurkite GET route, kuris grąžins visų prekių pavadinimus (grąžinamas formatas: ["iPhone 13", "Samsung Galaxy S22", "Dell XPS 15", "MacBook Pro", "Sony WH-1000XM4", "Bose QuietComfort 35 II"]).
app.get("/names", (reg, res)=>{
    const names=data.map((products)=>products.name);
    res.send(names);
});

// 5.Sukurkite GET route, į kurį pasikreipus, grąžins visų prekių, kurių kiekis sandėlyje yra mažesnis už nurodytą kiekį, pavadinimus ir likug (formatas: [{"name": "Samsung Galaxy S22", "stock": 5}, {"name": "Dell XPS 15", "stock": 3}]).
app.get("/stock", (req, res)=>{
    const filteredProducts=data.filter((products)=>products.stock<11);
    const stocks=filteredProducts.map((stock)=>{
    return{
      name:stock.name,
      stock:stock.stock,
    };   
  });
    res.send(stocks);
});
//6 Papildomas: Sukurkite dinaminį GET route, kuris pagal kainos intervalą grąžins prekes, kurių kaina yra tarp nurodytų ribų (įskaitant jas). Parametrai turėtų būti perduodami URL kaip minPrice ir maxPrice.(du parametrai reikalingi)
app.get("/products/:minPrice/:maxPrice", (req, res) => {
  const minPrice = Number(req.params.minPrice);
  const maxPrice = Number(req.params.maxPrice);
  const filteredProducts = data.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );
  res.send(filteredProducts);
});

//  7. Papildomas: Sukurkite POST route, kuris leis pridėti naują prekę prie duomenų sąrašo. Nauja prekė turėtų turėti id, name, category, price ir stock laukus. Užtikrinkite, kad naujoji prekė neturėtų to paties id kaip jau esančios prekės.
app.post("/products", (req, res) => {
  const newProduct = req.body;

  const isIdExist = data.some((product) => product.id === newProduct.id);

  if (isIdExist) {
    res.send("Product with this ID already exists.");
  } else {
    data.push(newProduct);
    res.send(req.body);
  }
});


app.listen(port, ()=>console.log(`server on port ${port}...`));