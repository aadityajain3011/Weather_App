async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const result = document.getElementById("result");

  if (!city) {
    result.innerHTML = "Please enter a city ⚠️";
    return;
  }

  const apiKey = "API_KEY";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod != 200) {
      result.innerHTML = "City not found ❌";
      return;
    }

    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    result.innerHTML = `
      <div class="weather-box">
        <h3>${data.name}</h3>
        <img src="${iconUrl}" alt="weather icon">
        <p>🌡️ Temperature: ${data.main.temp} °C</p>
        <p>🌥️ Weather: ${data.weather[0].main}</p>
        <p>💧 Humidity: ${data.main.humidity}</p>
        <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
      </div>
    `;

  } catch (error) {
    result.innerHTML = "Error fetching data ❌";
  }
}

// Enter key support
document.getElementById("cityInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    getWeather();
  }
});