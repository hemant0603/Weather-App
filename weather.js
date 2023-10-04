function searchWeather() {
    const apiKey = "d2a687501f15ddf09d1949d7f62644bc";
    const search = document.getElementById('search').value;
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${apiKey}`;

    // Fetch current weather data
    fetch(currentWeatherUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`City not found: ${search}`);
        }
        return response.json();
    })
        .then(data => {
            document.getElementById('location').innerHTML = data.name + "," + " " + data.sys.country;
            const currentDate = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = currentDate.toLocaleDateString('en-US', options);
            document.getElementById('date').innerHTML = formattedDate;
           
            const tempCelsius = (data.main.temp - 273.15).toFixed(2);
            document.getElementById('temperature-output').innerHTML =  tempCelsius + "°C";

            document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            document.getElementById('description-output').innerHTML = data.weather[0].description;
            document.getElementById('humidity-output').innerHTML = "Humidity: " + data.main.humidity + "%";
            document.getElementById('wind-output').innerHTML = "Wind: " + data.wind.speed + " m/s";
            document.getElementById('pressure-output').innerHTML = "Pressure: " + data.main.pressure + "mb";

            const weatherIcon = document.getElementById('weather-icon');
            weatherIcon.classList.remove('hidden');
        })
        .catch(error => {
           
            alert(`${error.message}`);
        });

    // Fetch weather forecast data
    fetch(forecastUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`City not found: ${search}`);
        }
        return response.json();
    })
        .then(data => {
            const forecastContainer = document.getElementById('forecast-container');
            forecastContainer.innerHTML = ''; 

            const today = new Date().getDay(); 

            for (let i = 0; i < data.list.length; i++) {
               
                const day = data.list[i];
                const forecastDate = new Date(day.dt_txt);
                
                
                if (forecastDate > new Date() && forecastDate.getHours() === 12 && forecastDate.getMinutes() === 0) {
                    const dayElement = document.createElement('div');
                    dayElement.classList.add('weeks');
                   
                    const tempCelsius = (day.main.temp - 273.15).toFixed(2);

                    dayElement.innerHTML = `
                        <p>${forecastDate.toDateString()}</p>
                        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
                        
                        <p>${day.weather[0].description}</p>
                        <p> ${tempCelsius}°C</p>
                    `;
                    forecastContainer.appendChild(dayElement);
                }
            }
        })
       
}
