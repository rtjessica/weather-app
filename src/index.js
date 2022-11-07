function getCity(event) {
  event.preventDefault();
  //let currentCity = document.querySelector("#current-place");
  let cityinput = document.querySelector("#city-input").value;
  let apiKey = "6e6ec494746b5229a9f2d526478c924c";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityinput}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showTemp);
  console.log(url);
  //currentCity.innerHTML = cityinput.value;
}

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("click", getCity);

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

let dateDisplay = document.querySelector("#date");
let date = new Date();
dateDisplay.innerHTML = formatDate(date);

function convertToC() {
  let temp = document.querySelector("#temperature");
  console.log(temp);
  let tempCelsius = temp.value * 1.8 + 32;
  console.log(tempCelsius);
  temp.innerHTML = tempCelsius;
}

function convertToF() {
  let temp = document.querySelector("#temperature");
  let tempFahrenheit = temp * 1.8 + 32;
  console.log(tempFahrenheit);
  temp.innerHTML = tempFahrenheit;
  //temp.innerHTML = 66;
}

let celsius = document.querySelector("#c-degrees");
celsius.addEventListener("click", convertToC);
let fahrenheit = document.querySelector("#f-degrees");
fahrenheit.addEventListener("click", convertToF);

function showTemp(response) {
  console.log(response);
  let temp = Math.round(response.data.main.temp);
  let city = response.data.name;
  let description = response.data.weather[0].main;
  let wind = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let place = document.querySelector("#current-place");
  let desc = document.querySelector("#description");
  let temperature = document.querySelector("#temperature");
  let windInfo = document.querySelector("#wind");
  let humidityInfo = document.querySelector("#humidity");
  place.innerHTML = `${city}`;
  desc.innerHTML = `${description}`;
  temperature.innerHTML = `${temp}`;
  windInfo.innerHTML = `${wind}`;
  humidityInfo.innerHTML = `${humidity}`;
}

function getPosition(position) {
  let apiKey = "6e6ec494746b5229a9f2d526478c924c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showTemp);
}

navigator.geolocation.getCurrentPosition(getPosition);
