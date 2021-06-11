'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// const request = fetch("https://restcountries.eu/rest/v2/name/portugal")
//   .then(function (response) { return response.json() })
  // .then(function (data) { console.log(data) });
  

const renderCounty = function(data) {
    // console.log(data);
    const { flag, name, region, population, languages, currencies } = data;
    const html = `
      <article class="country">
      <img class="country__img" src="${flag}" />
      <div class="country__data">
      <h3 class="country__name">${name}</h3>
      <h4 class="country__region">${region}</h4>
      <p class="country__row"><span>👫</span>${+(population / 1000000).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${languages[0].name}</p>
      <p class="country__row"><span>💰</span>${currencies[0].name}</p>
      </div>
      </article>
    `
    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    // .then( function(response) { console.log(response) } )
    .then( function(response) { return response.json() } )
    .then( function(countryData) { renderCounty(countryData[0]) } );
};

getCountryData("portugal");
getCountryData("germany");




// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open( "GET", `https://restcountries.eu/rest/v2/name/${country}` );
//   request.send();
  
//   request.addEventListener("load", function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     const { flag, name, region, population, languages, currencies } = data;
//     const html = `
//     <article class="country">
//     <img class="country__img" src="${flag}" />
//     <div class="country__data">
//     <h3 class="country__name">${name}</h3>
//     <h4 class="country__region">${region}</h4>
//     <p class="country__row"><span>👫</span>${+(population / 1000000).toFixed(1)} people</p>
//     <p class="country__row"><span>🗣️</span>${languages[0].name}</p>
//     <p class="country__row"><span>💰</span>${currencies[0].name}</p>
//     </div>
//     </article>
//     `
//     countriesContainer.insertAdjacentHTML("beforeend", html);
//     countriesContainer.style.opacity = 1;
    
//   });
// };

// getCountryData("portugal");
// getCountryData("usa");
// getCountryData("germany");
