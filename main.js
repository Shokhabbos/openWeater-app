const api = {
  key: "8b8763aa76fd70241f902d74a68f6727",
  baseURL: "https://api.openweathermap.org/data/2.5/",
  units: "metric",
};

const searchBtn = document.querySelector(".search-btn");
const display = document.querySelector(".display");
const searchInput = document.querySelector("#search");
const toshkent = document.querySelector("#toshkent");
const towns = document.querySelectorAll("#town");
const place = document.querySelector(".place");
const weather__temp = document.querySelector(".weather__temp");
const weather__temp1 = document.querySelector("#weather__temp");
const city = document.querySelector("#city");
const humidity = document.querySelector(".humidity ");
const wind = document.querySelector(".wind ");
const pressure = document.querySelector(".pressure ");
const date = document.querySelector(".weather__time");
const condition = document.querySelector(".detail-left");
const icon = document.querySelector(".icon");
let defaultCity = "Tashkent";

searchBtn.addEventListener("click", () => {
  searchInput.focus();
});

function renderData(data) {
  if (data.cod === 200) {
    place.innerHTML = data.name;
    const now = new Date();
    weather__temp.innerHTML = `${Math.round(data.main.temp)}<sup>°</sup> `;
    weather__temp1.innerHTML = `${Math.round(data.main.temp)}<sup>°</sup> `;
    humidity.innerHTML = `${data.main.humidity}<span>%</span> `;
    wind.innerHTML = `${data.wind.speed}<span>meter/sec</span> `;
    pressure.innerHTML = `${data.main.pressure}<span>hPa</span> `;
    date.innerHTML = dateBinder(now);
    condition.innerHTML = data.weather[0].main;
    icon.innerHTML = ` <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" 
    alt="${data.weather[0].description}" 
   
     class="icon"/>
    `;
  }
}
towns.forEach(function (town) {
  town.addEventListener("click", function (e) {
    const ownTown = (searchInput.value = e.target.textContent);
    getCurrentCity(ownTown);
  });
});

const getCurrentCity = (ownTown) => {
  console.log(ownTown);
  fetch(
    `${api.baseURL}weather?q=${ownTown}&units=${api.units}&appid=${api.key}`
  )
    .then((res) => {
      if (!res.ok && query) {
        return (display.innerHTML = "Loading...");
      } else {
        display.innerHTML = "";
        return res.json();
      }
    })
    .then((data) => {
      console.log(data);
      renderData(data);
    })
    .catch((err) => console.log("err=>", "There is no such a city!"));
};

function delay(callback, ms) {
  let timer = 0;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(context, args);
    }, ms || 0);
  };
}

const setQuery = (e) => {
  const query = e?.target?.value;
  console.log(query, "query");
  getResults(query);
};
const getResults = (query) => {
  console.log(defaultCity, "de");
  fetch(`${api.baseURL}weather?q=${query}&units=${api.units}&appid=${api.key}`)
    .then((res) => {
      if (!res.ok && query) {
        return (display.innerHTML = "Loading...");
      } else {
        display.innerHTML = "";
        return res.json();
      }
    })
    .then((data) => {
      console.log(data);
      renderData(data);
    })
    .catch((err) => console.log("err=>", "There is no such a city!"));
};
const getCurrent = () => {
  let c = "Tashkent";
  fetch(`${api.baseURL}weather?q=${c}&units=${api.units}&appid=${api.key}`)
    .then((res) => {
      if (!res.ok && c) {
        return (display.innerHTML = "Loading...");
      } else {
        display.innerHTML = "";
        return res.json();
      }
    })
    .then((data) => {
      console.log(data);
      renderData(data);
    })
    .catch((err) => console.log("err=>", "There is no such a city!"));
};
getCurrent();

const dateBinder = (time) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[time.getDay()];
  const month = months[time.getMonth()];
  const currentTime = `${time.toLocaleTimeString()}`;
  const date = time.getDate();
  const year = time.getFullYear();

  return `${currentTime} - ${day}, ${date}  ${month} ${year}`;
};

searchInput.addEventListener("keyup", delay(setQuery, (time = 500)));
