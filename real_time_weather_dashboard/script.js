async function getWeather() {
  const apiKey = "0a43d634adebbd0d7d774fb38e004c26";
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      alert("City not found. Please enter a valid city name.");
      return;
    }

    const weatherMain = data.weather[0].main.toLowerCase();
    const description = data.weather[0].description;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const isNight = data.weather[0].icon.includes("n");

    document.getElementById("cityName").textContent = data.name;
    document.getElementById("description").textContent = description;
    document.getElementById("temp").textContent = `${temp}°C`;
    document.getElementById("humidity").textContent = humidity;
    document.getElementById("wind").textContent = wind;
    document.getElementById("timestamp").textContent = new Date().toLocaleTimeString();

    document.getElementById("weatherContainer").classList.remove("hidden");

    const body = document.body;
    if (isNight) {
      body.style.background = "linear-gradient(to bottom right, #0f2027, #203a43, #2c5364)";
    } else if (weatherMain.includes("cloud")) {
      body.style.background = "linear-gradient(to bottom right, #bdc3c7, #2c3e50)";
    } else if (weatherMain.includes("rain")) {
      body.style.background = "linear-gradient(to bottom right, #4b79a1, #283e51)";
    } else if (weatherMain.includes("clear")) {
      body.style.background = "linear-gradient(to bottom right, #4facfe, #00f2fe)";
    } else {
      body.style.background = "linear-gradient(to bottom right, #757f9a, #d7dde8)";
    }

  } catch (error) {
    alert("Network error. Please check your internet connection.");
    console.error(error);
  }
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    getWeather();
  }
}

// Auto-refresh every 5 minutes if card is visible
setInterval(() => {
  const container = document.getElementById("weatherContainer");
  if (!container.classList.contains("hidden")) {
    getWeather();
  }
}, 5 * 60 * 1000); // 5 minutes
