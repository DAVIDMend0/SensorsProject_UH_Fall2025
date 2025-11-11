document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('sensor-button').addEventListener('click', () => {
        window.location.href = 'sensorsReading.html';
    });

    const clockElement = document.getElementById('clock'); //Finds the "clock" div

    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString(); // Formats the time to be like "10:30:05 PM"
        clockElement.textContent = timeString;
    }

    updateClock();
    setInterval(updateClock, 1000);


    const weatherElement = document.getElementById('weather'); //Finds the "weather" div
    
    
    async function fetchWeather() {
        
        const lat = 29.5766735;
        const lon = -95.6528909;

        const userAgent = '(UH_Sensor_Project, dfmendo2@cougarnet.uh.edu)';
        
        const fetchOptions = {
            headers: {
                'User-Agent': userAgent
            }
        };

        try {
            const pointsUrl = `https://api.weather.gov/points/${lat},${lon}`;
            
            const pointsResponse = await fetch(pointsUrl, fetchOptions);
            const pointsData = await pointsResponse.json();

            const forecastUrl = pointsData.properties.forecast;

            const forecastResponse = await fetch(forecastUrl, fetchOptions);
            const forecastData = await forecastResponse.json();

            const currentForecast = forecastData.properties.periods[0];

            const temp = currentForecast.temperature;
            const unit = currentForecast.temperatureUnit;
            const description = currentForecast.shortForecast;

            weatherElement.textContent = `Houston: ${temp}°${unit} - ${description}`;

        } catch (error) {
            console.error('Error fetching weather:', error);
            weatherElement.textContent = 'Could not load weather.';
        }
    }
    fetchWeather();
    
});