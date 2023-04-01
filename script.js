"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////
//https://restcountries.com/v2/

const renderCountry = function (data) {
  const html = `
          <article class="country">
              <img class="country__img" src="${data.flags.png}" />
              <div class="country__data">
              <h3 class="country__name">${data.name.common}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
              ).toFixed(1)} million</p>
              <p class="country__row"><span>🗣️</span>${
                Object.values(data.languages)[0]
              }</p>
              <p class="country__row"><span>💰</span>${
                Object.values(data.currencies)[0].name
              }</p>
              </div>
          </article>
          `;

  //insert HTML in our page
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

// const getCountryData = function (country) {
//   //--- Old school to use AJAX calls (new way is done through Promises)
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
//   request.send(); //The request is being sent in the background and when the data arrives back, the load event will be called

//   // Get the result:
//   request.addEventListener("load", function () {
//     const [data] = JSON.parse(this.responseText);
//     renderCountry(data);
//   });
// };

// //Since these are async calls, we can't control the order their respones will arrive
// //which might cause the data to be shown in a different order
// getCountryData("france");
// getCountryData("usa");
// getCountryData("germany");

//--------------------------------
// A solution to Excecute Async calls in sequence can be by chaining/nesting the callbacks, but it can cause a Callback Hell, where the code would be hard to undersatand and prone to bugs.

//A better solution is to use Promises

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then((data) => renderCountry(data[0]));
};

getCountryData("germany");