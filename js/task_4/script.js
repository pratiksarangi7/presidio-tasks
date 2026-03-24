import { weatherApi } from "./config.js";

const baseUrl = "https://api.weatherapi.com/v1/current.json"
const list = document.getElementById('weatherInfo');
async function fetchWeatherData() {
    const city = document.getElementById('input').value;
    const weatherInfoList = document.getElementById("weatherInfo")
    const params = new URLSearchParams({
        key: weatherApi,
        q: city
    })
    try {
        const response = await fetch(`${baseUrl}?${params}`);
        const data = await response.json();
        if (data.error) throw Error(data.error.message);
        const displayData = [
            `City: ${data.location.name}`,
            `Region: ${data.location.region}`,
            `Country: ${data.location.country}`,
            `Temperature: ${data.current.temp_c}°C`,
            `Feels Like: ${data.current.feelslike_c}°C`,
            `Humidity: ${data.current.humidity}%`,
            `Condition: ${data.current.condition.text}`
        ];
        list.innerHTML = '';
        displayData.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            list.appendChild(li);
        });

    } catch (error) {
        list.innerHTML = `<li>${error}</li>`
    }
}

document.getElementById('getInfoBtn').addEventListener('click', fetchWeatherData);