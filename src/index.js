function formatDate(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let currentDay = days[date.getDay()];

  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  let formattedDate = `${currentDay}, ${currentHour}:${currentMinute}`;
  return formattedDate;
}

function fixDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayWeeklyForecast(response) {
  let apiForecast = response.data.daily;

  let forecast = document.querySelector("#weekly-forecast");

  let forecastHTML = `<div class="row">`;

  apiForecast.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
          <div class="weekly-forecast-date">${fixDay(day.dt)}</div>
            <img
              class="weekly-forecast-icons"
              src="http://openweathermap.org/img/wn/${
                day.weather[0].icon
              }@2x.png"
              id="icon" />
          <div class="weekly-forecast-temperature">
            <span class="weekly-forecast-temperature-max">${Math.round(
              day.temp.max
            )}°</span>
            <span class="weekly-forecast-temperature-min">${Math.round(
              day.temp.min
            )}°</span>
          </div>
       </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function accessForecast(coords) {
  let apiKey = "88724523008dc9e1be18f6eb6a959b67";
  let apiUrl = `https:\\api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeeklyForecast);
}

function showTemp(response) {
  console.log(response);
  let place = document.querySelector("#current-place");
  let desc = document.querySelector("#description");
  let temperature = document.querySelector("#temperature");
  let windInfo = document.querySelector("#wind");
  let humidityInfo = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  place.innerHTML = response.data.name;
  desc.innerHTML = response.data.weather[0].main;
  temperature.innerHTML = Math.round(celsiusTemperature);
  windInfo.innerHTML = Math.round(response.data.wind.speed);
  humidityInfo.innerHTML = response.data.main.humidity;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  accessForecast(response.data.coord);
}

function getCity(city) {
  let apiKey = "6e6ec494746b5229a9f2d526478c924c";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showTemp);
  console.log(url);
}

function handleClick(event) {
  event.preventDefault();
  let cityinput = document.querySelector("#city-input");
  getCity(cityinput.value);
}

function showPosition(position) {
  let apiKey = "6e6ec494746b5229a9f2d526478c924c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showTemp);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let dateDisplay = document.querySelector("#date");
let date = new Date();
dateDisplay.innerHTML = formatDate(date);

let local = document.querySelector("#geolocation");
local.addEventListener("click", getPosition);

let celsiusTemperature = null;

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("click", handleClick);

getCity("New York");
