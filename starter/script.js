'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log("Lottery draw is happening!!!");
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve("You WIN 💰");
//     } else {
//       reject(new Error("You Lost your money😭"));
//     };
//   }, 3000);
//   console.log("Good Luck🤞");
// });

// console.log(lotteryPromise);

// lotteryPromise
//   .then(resolution => console.log(resolution))
//   .catch(error => console.error(error));


// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(function () {
//       resolve(seconds)
//     }, seconds * 1000)
//   });
// };

// wait(1)
//   .then((resolution) => {
//     console.log(resolution);
//     console.log(`I waited ${resolution} seconds`);
//     return wait(2);
//   }).then((resolution) => {
//     console.log(resolution);
//     console.log(`I waited ${resolution} seconds`);
//     return wait(3);
//   }).then((resolution) => {
//     console.log(resolution);
//     console.log(`I waited ${resolution} seconds`);
//     return wait(4);
//   }).then((resolution) => {
//     console.log(resolution);
//     console.log(`I waited ${resolution} seconds`);
//   });
  
// Promise.resolve("Promise Resolved").then(resolution => console.log(resolution));
// Promise.reject(new Error("Promise Rejected")).catch(error => console.log(error));
// Promise.reject("Promise Rejected").catch(error => console.log(error));


// navigator.geolocation.getCurrentPosition(
//   position => { console.log(position) },
//   error => { console.error(error) }
// );


// console.log(locationPosition);


// console.log("Test start");

// setTimeout(() => console.log("0 Sec timer"), 0);

// Promise.resolve("Resolved promise 1")
//   .then(response => console.log(response));

// console.log("Test end");






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

  // btn.addEventListener("click", function () {
  //   // console.log("Where am I button clicked");
  //   getCountryData("portugal")
  // });
  
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

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   error => reject(error)
    // )
    navigator.geolocation.getCurrentPosition(resolve, reject)
  });
};      

// const whereAmI = function (latitude, longitude) {
const whereAmI = function () {
  
  getPosition()
    .then(position => {
      const { latitude, longitude } = position.coords;    
      
      return fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`)
    })
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

btn.addEventListener("click", function() { whereAmI() })


// getPosition()
//   .then(position => {
//     const {latitude, longitude} = position.coords
//     whereAmI(latitude, longitude);
//   });

// whereAmI(getPosition())


// whereAmI(52.508, 13.381)
// whereAmI(19.037, 72.873)
// whereAmI(-33.933, 18.474)
// whereAmI(39.0395328,-76.6759214)
  