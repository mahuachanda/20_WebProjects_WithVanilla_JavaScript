const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const sortBtn = document.getElementById("sort");
const showMillionairesBtn = document.getElementById("show-millionaires");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

async function getRandomUsers() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];
  //console.log(user.name);
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  console.log(newUser);
  addData(newUser);
}

//Add new object to data array

function addData(obj) {
  data.push(obj);

  updateDOM(data);
}
//double money
function doubleMoney() {
  console.log("data::::", data);
  data = data.map((user) => {
    const name = user.name;
    const money = user.money * 2;
    // return { name, money };
    return { ...user, money: user.money * 2 }; //destruction object
  });

  updateDOM(data);
}

//
function sortByRich() {
  data.sort((a, b) => {
    return b.money - a.money;
  });

  updateDOM(data);
}

//
function filterByMillionaries() {
  data = data.filter((user) => user.money > 1000000);

  updateDOM();
}

//calculate total wealth

function calculateWealth() {
  const wealth = data.reduce((acc, user) => acc + user.money, 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total wealth <strong>${formatMoney(
    wealth
  )}$</strong></h3>`;

  main.appendChild(wealthEl);
}
//update the main section in the dom
function updateDOM(providedData = data) {
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  /* <div class="person"> 
    <strong>{item.name}</strong> $ {item.money}
  
  </div> */

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong> ${item.name} </strong>  ${formatMoney(
      item.money
    )}`;

    main.append(element);
  });
}

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

addUserBtn.addEventListener("click", getRandomUsers);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRich);
showMillionairesBtn.addEventListener("click", filterByMillionaries);
calculateWealthBtn.addEventListener("click", calculateWealth);
