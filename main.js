const api = {
  key: "8b8763aa76fd70241f902d74a68f6727",
  baseURL: "https://api.openweathermap.org/data/2.5/",
  units: "metric",
};

const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector("#search");

searchBtn.addEventListener("click", () => {
  searchInput.focus();
});

const setQuery = (e) => {
  const query = e.target.value;
  getResults(query);
};
const getResults = (query) => {
  fetch(`${api.baseURL}weather?q=${query}&units=${api.units}&appid=${api.key}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
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
      if (data.cod === "404") {
        const city = document.querySelector("#city");

        console.log(query, "qqqqqqq");
        console.log(data.cod, "qqqqqqq");
        city.innerHTML = `<span>Yo</span>`;
      }
      console.log(data);

      const now = new Date();
      place.innerHTML = data.name;
      city.innerHTML = data.name;
      weather__temp.innerHTML = `${Math.round(data.main.temp)}<sup>°</sup> `;
      weather__temp1.innerHTML = `${Math.round(data.main.temp)}<sup>°</sup> `;
      humidity.innerHTML = `${data.main.humidity}<span>%</span> `;
      wind.innerHTML = `${data.wind.speed}<span>meter/sec</span> `;
      pressure.innerHTML = `${data.main.pressure}<span>hPa</span> `;
      date.innerHTML = dateBinder(now);
      condition.innerHTML = data.weather[0].main;
      icon.innerHTML = ` <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" 
      alt="${data.weather[0].description}" 
      width="50" 
      height="50"
       class="icon"/>
      `;
    })
    .catch((err) => console.log("err=>", "There is no such a city!"));
};

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

searchInput.addEventListener("keyup", setQuery);
