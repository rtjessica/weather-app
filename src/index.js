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

function displayWeeklyForecast() {
  let forecast = document.querySelector("#weekly-forecast");

  let forecastHTML = `<div class="row">`;

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col-2">
          <div class="weekly-forecast-date">${day}</div>
            <img
              class="weekly-forecast-icons"
              src="http://openweathermap.org/img/wn/10d@2x.png"
              id="icon" />
          <div class="weekly-forecast-temperature">
            <span class="weekly-forecast-temperature-max">20°</span>
            <span class="weekly-forecast-temperature-min">18°</span>
          </div>
       </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
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

  displayWeeklyForecast();
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

function convertToC(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(celsiusTemperature);
}

function convertToF(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let tempFahrenheit = (celsiusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(tempFahrenheit);
}

let dateDisplay = document.querySelector("#date");
let date = new Date();
dateDisplay.innerHTML = formatDate(date);

let local = document.querySelector("#geolocation");
local.addEventListener("click", getPosition);

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#c-degrees");
celsiusLink.addEventListener("click", convertToC);

let fahrenheitLink = document.querySelector("#f-degrees");
fahrenheitLink.addEventListener("click", convertToF);

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("click", handleClick);

getCity("New York");
