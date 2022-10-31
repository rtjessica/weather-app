let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

let city = prompt("What city do you want the weather for?");
city = city.trim().toLowerCase();

if (weather[city] !== undefined) {
  alert(
    `It is currently ${Math.round(weather[city].temp)} °C (${Math.round(
      weather[city].temp * 1.8 + 32
    )}F) in ${city} with a humidity of ${weather[city].humidity}%`
  );
} else {
  alert(
    `Sorry, we don't know what one, could you try google? https://www.google.com/search?q=weather+${city}`
  );
}
