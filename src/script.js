let weather = {
  // API key used to retreive data from database
  apiKey: "(API KEY GOES HERE)",
  fetchWeather: function (city) {
    // FAtching the data from the api
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        this.apiKey
    )
      // after we retreive the data from the api we want it to repond in JSON data
      .then((response) => response.json())
      // after we receive the data  we console.log in the console
      .then((data) => this.displayWeather(data));
  },

  // This will help use retieve the data for each section and replace the or fill in the data for the proper section
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    // require("dotenv").config();

    document.querySelector(".city").innerText = "Weather in " + name;

    document.querySelector(".icon").src =
      "http://openweathermap.org/img/wn/" + icon + "@2x.png";

    document.querySelector(".description").innerText = description;

    // Rounds the decimal up to the nearest interger Math.round

    document.querySelector(".temp").innerText = Math.round(temp) + "°F";

    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";

    document.querySelector(".wind").innerText =
      "Wind speed: " + Math.round(speed) + " mph";

    document.querySelector(".weather").classList.remove("loading");
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")

  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Austin");
