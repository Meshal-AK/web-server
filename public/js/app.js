console.log("Client side javascript file is loaded");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");
const weatherDiv = document.querySelector("div").children;

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  weatherDiv[3].textContent = "Loading";
  weatherDiv[4].textContent = "";

  fetch(
    `http://localhost:3000/weather?address=${weatherForm.elements[0].value}`
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        weatherDiv[3].textContent = data.error;
        console.log(data.error);
      } else {
        weatherDiv[3].textContent = data.location;
        weatherDiv[4].textContent = data.weather;
      }
    });
  });
});
