// Users api base url
const usersBaseUrl = "https://jsonplaceholder.typicode.com/";
// Photos api base url
const photoBaseUrl = "https://robohash.org/";
const users = document.querySelector(".users");
const input = document.querySelector("input");
const loading = document.getElementById("loading");
let usersObjects;
loading.style.display = "none";

input.addEventListener("input", (e) => {
  let value = e.target.value.toLowerCase();
  let filtered = [];
  usersObjects.forEach((user) => {
    if (user.name.toLowerCase().includes(value)) filtered.push(user);
  });
  bindData(filtered);
});

async function getUsers() {
  loading.style.display = "inline-block";
  const response = await fetch(usersBaseUrl + "users");
  const data = await (await response).json();
  usersObjects = data;
  loading.style.display = "none";
  bindData(usersObjects);
}

getUsers();

function bindData(filtered) {
  users.innerHTML = "";
  filtered.forEach((user) => {
    addUserBox(user);
  });
}

function addUserBox(user) {
  // creation of the card
  let card = document.createElement("div");
  card.classList.add("card");
  card.style.width = "18rem";

  //   creation of the img
  let img = document.createElement("img");
  img.src = photoBaseUrl + user.id;
  img.classList.add("card-img-top");

  //creation of the class card body
  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  //   h5
  let h5 = document.createElement("h5");
  h5.classList.add("card-title");
  h5.innerHTML = user.name;

  //   p
  let p = document.createElement("p");
  p.classList.add("card-text");
  p.innerHTML = user.email;

  //   dflex
  let dFlex = document.createElement("div");
  dFlex.className = "d-flex justify-content-between";

  // btnPrimary
  let btnPrimary = document.createElement("button");
  btnPrimary.className = "btn btn-danger";
  btnPrimary.innerHTML = "Delete";

  btnPrimary.addEventListener("click", () => {
    let index = usersObjects.indexOf(user);
    usersObjects.splice(index, 1);
    bindData(usersObjects);
  });

  let btnChange = document.createElement("button");
  btnChange.className = "btn btn-primary";
  btnChange.innerHTML = "Change Image";
  btnChange.addEventListener("click", () => {
    let randomNr = Math.floor(Math.random() * 100) + 1;
    img.src = photoBaseUrl + randomNr;
  });

  cardBody.appendChild(h5);
  cardBody.appendChild(p);
  dFlex.appendChild(btnPrimary);
  dFlex.appendChild(btnChange);
  cardBody.appendChild(dFlex);
  card.appendChild(img);
  card.appendChild(cardBody);

  users.appendChild(card);
}
