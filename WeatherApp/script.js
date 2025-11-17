
document.getElementById("cityInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    getWeather();
  }
});

function updateDayNight() {
  const indiaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  const hour = new Date(indiaTime).getHours();
  
  const sky = document.body;
  const obj = document.getElementById("skyObject");

  if (hour >= 6 && hour < 18) {
    // Day
    sky.style.background = "linear-gradient(to bottom, #87CEEB, #E0F6FF)";
    obj.style.background = "#FFD700"; // Sun (yellow)
    obj.style.boxShadow = "0 0 60px rgba(255, 223, 0, 0.9)";
  } else {
    // Night
    sky.style.background = "linear-gradient(to bottom, #0a0a23, #1c1c3c)";
    obj.style.background = "#F0F0F0"; // Moon (white)
    obj.style.boxShadow = "0 0 40px rgba(255, 255, 255, 0.7)";
  }
}

// Refresh every 1 minute
setInterval(updateDayNight, 60000);


// ------- WEATHER API -------
async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const result = document.getElementById("weatherResult");

  const apiKey = "4033cd63a14f49aa8b213700251807";

  if (!city) {
    result.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    result.innerHTML = `
      <h2>${data.location.name}, ${data.location.country}</h2>
      <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
      <p><strong>Condition:</strong> ${data.current.condition.text}</p>
      <img src="https:${data.current.condition.icon}" />
      <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
      <p><strong>Wind:</strong> ${data.current.wind_kph} kph</p>
    `;
  } catch (error) {
    result.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}
