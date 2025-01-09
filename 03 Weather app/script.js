const cityInput = document.getElementById("city-input");
const getWeatherBtn = document.getElementById("get-weather-btn");
const weatherInfo = document.getElementById("weather-info");
const cityNameDisplay = document.getElementById("city-name");
const temperatureDisplay = document.getElementById("temperature");
const descriptionDisplay = document.getElementById("description");
const errorMessage = document.getElementById("error-message");

const API_KEY = "1eef835e0775d3f35d23431f3c6ac200";

cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    getWeatherData();
  }
});

getWeatherBtn.addEventListener("click", () => {
  getWeatherData();
});

async function getWeatherData() {
  const city = cityInput.value.trim();
  if (!city) return;

  try {
    const weatherData = await fetchWeatherData(city);
    displayWeatherData(weatherData);
  } catch (error) {
    showError();
  }
}

async function fetchWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  const response = await fetch(url);

  console.log(typeof response);
  console.log("RESPONES", response);

  if (!response.ok) {
    throw new Error("City not found. Please try again.");
  }

  const data = await response.json();

  return data;
}

function displayWeatherData(data) {
  console.log(data);
  const { name, main, weather } = data;

  cityNameDisplay.textContent = name;
  temperatureDisplay.textContent = `Temperature: ${main.temp}°C`;
  descriptionDisplay.textContent = `Weather: ${weather[0].description}`;

  weatherInfo.classList.remove("hidden");
  errorMessage.classList.add("hidden");
}

function showError() {
  weatherInfo.classList.add("hidden");
  errorMessage.classList.remove("hidden");
}
