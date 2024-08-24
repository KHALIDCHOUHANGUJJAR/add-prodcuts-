import { db, collection, getDocs } from "../firebase.js";
let card = document.getElementById("card");
let loader = document.getElementsByClassName("loader")[0];
const getProduct = async () => {
  card.innerHTML = "";
  loader.style.display = "block";
  try {
    const querySnapshot = await getDocs(collection(db, "Products"));

    if (querySnapshot.empty) {
        card.innerHTML = `<p class="NOTHINg">Nothing Found</p>`; 
        loader.style.display = "none";
        return;
    }

    querySnapshot.forEach((doc) => {
      console.log(doc.data(), doc.id);

      const { name, category, price, image } = doc.data();
      card.innerHTML += `
        <div class="card" >
          <img src="${image}" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">
             ${category}
            </p>
            <a href="#" class="btn btn-primary">Rs ${price}</a>
          </div>
        </div>
        `;
    });
    loader.style.display = "none";
  } catch (error) {
    loader.style.display = "none";
    card.innerHTML = `<p>Error loading data: ${error.message}</p>`;
  }
};
getProduct();
