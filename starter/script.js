'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// const request = fetch("https://restcountries.eu/rest/v2/name/portugal")
//   .then(function (response) { return response.json() })
  // .then(function (data) { console.log(data) });
  

const renderCounty = function(data, className = "") {
    // console.log(data);
    const { flag, name, region, population, languages, currencies } = data;
    const html = `
      <article class="country ${className}">
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
    // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  // countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = "Something went wrong") {
  return (
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${errorMsg}. Status: ${response.status}`);
        };
        return response.json();
      })
  );
};

const getCountryData = function (country) {
  getJSON(`https://restcountries.eu/rest/v2/name/${country}`, "Country not found")
    .then(countryData => {
      // console.log(countryData[0]);
      renderCounty(countryData[0]);
      const neighbour = countryData[0].borders[0];
      
      if (!neighbour) throw new Error("Neighbour country not found");
      return getJSON(`https://restcountries.eu/rest/v2/alpha/${neighbour}`, "Neighbor country not found")
    })
    .then(countryData => {
      // console.log(countryData);
      return renderCounty(countryData, "neighbour")
    })
    .catch(error => {
      // console.log(error.message);
      renderError(`Error: ${error.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener("click", function () {
  // console.log("Where am I button clicked");
  getCountryData("portugal")
});

// getCountryData("portugal")
// getCountryData("japan");


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


////////////////////// Code Challenge /////////////////////////////////

const whereAmI = function (latitude, longitude) {
  
  fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Request Throttled.  Over Rate limit (up to 2 per sec): Status: ${403}!`)
      }
      return response.json()
    })
    .then(object => {
      // console.log(object);
      const {city, country} = object;
      console.log(`You are in ${city}, ${country}`);

      getCountryData(`${country.toLowerCase()}`)
    })
    .catch(error => console.log(error));
  
};


whereAmI(52.508, 13.381)
// whereAmI(19.037, 72.873)
// whereAmI(-33.933, 18.474)
// whereAmI(39.0395328,-76.6759214)
  