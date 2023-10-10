/* 
container section -> select the seats that are not occupied -> use toggle method of classlist to select and unselect

updateSelectedCount() function calculates the seats count and total price of the tickets
*/

const container = document.querySelector(".container");
//const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");

const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value; //to change the type of string to number use +

console.log(typeof ticketPrice);
populateUI();

//Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}
//Update total and count

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected"); //Nodelist

  //copy selected seats into array, Map through array, return a new array

  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat); //Finding Index: In this specific code, you are trying to find the index of each selectedSeat within the seats NodeList. The indexOf method is used to accomplish this task.
  });
  //saving selected seats in the localStorage of browser
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  console.log("seat array::" + seatsIndex);

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//Get Data from localStorage and populate UI

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  console.log(selectedSeats);
  console.log(seats);
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//Movie select event

movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  //console.log(e.target.selectedIndex);//to select the index of the movieSelect
  setMovieData(e.target.selectedIndex, ticketPrice);
  updateSelectedCount();
});
//Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

//Initial count and total set
updateSelectedCount();
