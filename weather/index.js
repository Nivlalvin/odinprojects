const API_KEY = 'F7HVP28NLGZJGA9H8N2G67QFE';
let currentTempC = null;
let currentTempF = null;
let isCelsius = true;

document.getElementById('weather-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const location = document.getElementById('location').value.trim();
    const weekForecastDiv  = document.getElementById('week-forecast');
    const  todayForecastDiv = document.getElementById('today-forecast');
    const loadingDiv = document.getElementById('loading');
    const toggleTempButton = document.getElementById('toggle-temp');

    if (!location) {
        todayForecastDiv.innerHTML = '<p class="error">Please enter a location</p>';
        return;
    }

    todayForecastDiv.innerHTML = '';
    weekForecastDiv.innerHTML = '';
    loadingDiv.classList.remove('hidden');
    toggleTempButton.classList.add('hidden');

    try {
        const response = await fetch (`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&key=${API_KEY}`);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`)
        }

        const data = await response.json();

        if (!data || !data.days || data.days.length === 0) {
            throw new Error("Invalid location or data unavailable")
        }

        currentTempC = data.days[0].temp; 
        currentTempF = (currentTempC * 9/5) + 32;

        let todayForecast = `
            <h2>${data.resolvedAddress}</h2>
            <h3>Today</h3>
            <p>Temperature: <span id="temperature">${isCelsius ? currentTempC : currentTempF.toFixed(1)}°${isCelsius ? 'C' : 'F'}</span></p> 
            <p>Weather: ${data.days[0].conditions}</p>
            <p>Humidity: ${data.days[0].humidity}%</p>
        `;

        todayForecastDiv.innerHTML = todayForecast;

        if (data.days.length > 1) {
            let weekForecast = '<h2>Week Forecast</h2>';
            data.days.slice(1, 7).forEach((day, index) => {
                weekForecast += `
                <div class="week-record">
                    <p><strong>Date: ${day.datetime}</strong></p>
                    <p>Temp: ${isCelsius ? day.temp : (day.temp * 9/5 + 32).toFixed(1)}°${isCelsius ? 'C' : 'F'}</p>
                    <p>Weather: ${day.conditions}</p>
                    <p>Humidity: ${day.humidity}%</p>
                </div>
                ${index < 6 ? '<hr>' : ''}    
                `;
            });
            weekForecastDiv.innerHTML = weekForecast;
        } else {
            weekForecastDiv.innerHTML = '<p>No week forecast available</p>';
        }

        toggleTempButton.classList.remove('hidden');
    }catch (error) {
        todayForecastDiv.innerHTML = `<p class='error'>Error: ${error.message}</p>`;
    } finally {
        loadingDiv.classList.add('hidden')
    }
});

document.getElementById('toggle-temp').addEventListener('click', function() {
    const tempElement = document.getElementById('temperature');
    if (isCelsius) {
        tempElement.innerHTML = `${currentTempF.toFixed(1)}°F`;
        currentTempC = (currentTempF - 32) * 5 / 9; 
        this.innerHTML = 'Switch to °C';
    }else {
        tempElement.innerHTML = `${currentTempC}°C`;
        currentTempF = (currentTempC * 9 / 5) + 32; 
        this.innerHTML = 'Switch to °F';
    }
    isCelsius = !isCelsius;
});
