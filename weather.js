const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

const apiKey = '139920e7f7562e3d4b3839f1a494e974';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            alert('City not found');
            throw new Error('City not found');
        }
        var data = await response.json();
        console.log(data);

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.floor(data.main.temp) + '°C';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + ' km/hr';

        if (data.weather[0].main == 'Clouds') {
            weatherIcon.src = 'images/clouds.png'
        } else if (data.weather[0].main == 'Clear') {
            weatherIcon.src = 'images/clear.jpg'
        } else if (data.weather[0].main == 'Rain') {
            weatherIcon.src = 'images/rain.jpg'
        } else if (data.weather[0].main == 'Drizzle') {
            weatherIcon.src = 'images/drizzle.png'
        } else if (data.weather[0].main == 'Mist') {
            weatherIcon.src = 'images/mist.png'
        } else if (data.weather[0].main == 'Snow') {
            weatherIcon.src = 'images/Ssnow.jpg'
        }
    }catch (error) {

        console.error('Error fetching weather:', error);
        document.querySelector('.city').innerHTML = 'City not found';
        document.querySelector('.temp').innerHTML = 'N/A';
        document.querySelector('.humidity').innerHTML = '--%';
        document.querySelector('.wind').innerHTML = '-- km/hr';
    }
}

searchBtn.addEventListener('click', () => {
    if (searchBox.value === '') {
        alert('Please enter a city name')
    } else {

        checkWeather(searchBox.value)
    }

});