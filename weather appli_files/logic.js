
// const cityInput = document.querySelector(".city-input");
// const searchButton = document.querySelector(".search-btn");
// const weatherCardsDiv = document.querySelector(".weather-cards");
// const locationButton=document.querySelector(".location-btn")
// const currentWeatherDiv = document.querySelector(".current-weather");

// const API_key = "d6bb778ea732239609039e2b8e4f41be";

// const createWeatherCard = (cityName, weatherItem, index) => {
//     if (index === 0) { // HTML for the main weather top
//         return `
//             <div class="details">
//                 <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
//                 <h4>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
//                 <h4>Wind: ${weatherItem.wind.speed} m/s</h4>
//                 <h4>Humidity: ${weatherItem.main.humidity}%</h4>
//             </div>
//             <div class="icon">
//                 <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
//                 <h4>${weatherItem.weather[0].description}</h4>
//             </div>`;
//     } else { // HTML for the other five days
//         return `
//             <li class="card">
//                 <h3>${weatherItem.dt_txt.split(" ")[0]}</h3>
//                 <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
//                 <h4>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
//                 <h4>Wind: ${weatherItem.wind.speed} m/s</h4>
//                 <h4>Humidity: ${weatherItem.main.humidity}%</h4>
//             </li>`;
//     }
// };

// const getWeatherDetails = (cityName, lat, lon) => {
//     const WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&appid=${API_key}`;

//     fetch(WEATHER_API_URL)
//         .then(res => res.json())
//         .then(data => {
//             const uniqueForeCastDays = [];

//             const fiveDaysForecast = data.list.filter(forecast => {
//                 const foreCastDate = new Date(forecast.dt_txt).getDate();
//                 if (!uniqueForeCastDays.includes(foreCastDate)) {
//                     return uniqueForeCastDays.push(foreCastDate);
//                 }
//             });

//             // Clearing previous data
//             cityInput.value = "";
//             currentWeatherDiv.innerHTML = "";
//             weatherCardsDiv.innerHTML = "";

//             fiveDaysForecast.forEach((weatherItem, index) => {
//                 if (index === 0) {
//                     currentWeatherDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
//                 } else {
//                     weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
//                 }
//             });
//         })
//         .catch(() => {
//             alert("An error occurred while fetching the weather data.");
//         });
// };

// const getCityCoordinates = () => {
//     const cityName = cityInput.value.trim(); // Get user-entered city name and remove extra spaces
//     if (!cityName) return; // Return if city name is empty

//     const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_key}`;

//     fetch(GEOCODING_API_URL)
//         .then(res => res.json())
//         .then(data => {
//             if (!data.length) return alert(`No coordinates found for ${cityName}`);

//             const { name, lat, lon } = data[0];
//             getWeatherDetails(name, lat, lon);
//         })
//         .catch(() => {
//             alert("An error occurred while fetching the city coordinates.");
//         });
// };
// const getUserCoordinates=() =>{
//     navigator.geolocation.getCurrentPosition(
//         position =>{
//             const {latitude,longitude}=position.coords;//getting user loaction
           
//             const REVERSE_GEOCODING_URL=`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=&appid=${API_key}`
//            //get city name from coordinates using reverse geocoding api
//             fetch(REVERSE_GEOCODING_URL)
//         .then(res => res.json())
//         .then(data => {
//             const {name}=data[0];
//             getWeatherDetails(name,latitude,longitude);
            
//         })
//         .catch(() => {
//             alert("An error occurred while fetching the city .");
//         });
//         },
//         error=>{
//             if(error.code===error.PERMISSION_DENIED){
//                 alert("Geolocation request failed")
//             }
    
//         }
//     );
// }

// searchButton.addEventListener("click", getCityCoordinates);
// locationButton.addEventListener("click", getUserCoordinates);
// cityInput.addEventListener("keyup",e=>e.key==="Enter" && getCityCoordinates());














const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const weatherCardsDiv = document.querySelector(".weather-cards");
const locationButton = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".current-weather");

const API_key = "d6bb778ea732239609039e2b8e4f41be";

// Function to change the background image based on weather condition
const changeBackground = (weatherCondition) => {
    let bgImage = '';
    switch (weatherCondition) {
        case 'Clear':
            bgImage = 'url("clear.jpg")';  // Replace with your image path
            break;
        case 'Rain':
            bgImage = 'url("rainy.jpg")';
            break;
        case'Overcast Clouds':
            bgImage = 'url("overcast.jpg")';
            break;
        case 'Snow':
            bgImage = 'url("snow.jpg")';
            break;
        case 'Thunderstorm':
            bgImage = 'url("thunder.jpg")';
            break;
        
        default:
            bgImage = 'url("blue.jpg")';  // Default background
    }
    document.body.style.background = bgImage;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.transition = 'background 1s ease';  // Smooth transition
};

// Function to create weather card HTML
const createWeatherCard = (cityName, weatherItem, index) => {
    const weatherCondition = weatherItem.weather[0].main;

    // Call the changeBackground function when first forecast data is fetched (for dynamic background)
    if (index === 0) {
        changeBackground(weatherCondition);
    }

    if (index === 0) { // HTML for the main weather top
        return `
            <div class="details">
                <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
                <h4>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
                <h4>Wind: ${weatherItem.wind.speed} m/s</h4>
                <h4>Humidity: ${weatherItem.main.humidity}%</h4>
            </div>
            <div class="icon">
                <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                <h4>${weatherItem.weather[0].description}</h4>
            </div>`;
    } else { // HTML for the other five days
        return `
            <li class="card">
                <h3>${weatherItem.dt_txt.split(" ")[0]}</h3>
                <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                <h4>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
                <h4>Wind: ${weatherItem.wind.speed} m/s</h4>
                <h4>Humidity: ${weatherItem.main.humidity}%</h4>
            </li>`;
    }
};

// Function to fetch weather details based on city name
const getWeatherDetails = (cityName, lat, lon) => {
    const WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&appid=${API_key}`;

    fetch(WEATHER_API_URL)
        .then(res => res.json())
        .then(data => {
            const uniqueForeCastDays = [];

            const fiveDaysForecast = data.list.filter(forecast => {
                const foreCastDate = new Date(forecast.dt_txt).getDate();
                if (!uniqueForeCastDays.includes(foreCastDate)) {
                    return uniqueForeCastDays.push(foreCastDate);
                }
            });

            // Clearing previous data
            cityInput.value = "";
            currentWeatherDiv.innerHTML = "";
            weatherCardsDiv.innerHTML = "";

            fiveDaysForecast.forEach((weatherItem, index) => {
                if (index === 0) {
                    currentWeatherDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
                } else {
                    weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
                }
            });
        })
        .catch(() => {
            alert("An error occurred while fetching the weather data.");
        });
};

// Function to get city coordinates based on city name
const getCityCoordinates = () => {
    const cityName = cityInput.value.trim();
    if (!cityName) return;  // Return if city name is empty

    const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_key}`;

    fetch(GEOCODING_API_URL)
        .then(res => res.json())
        .then(data => {
            if (!data.length) return alert(`No coordinates found for ${cityName}`);

            const { name, lat, lon } = data[0];
            getWeatherDetails(name, lat, lon);
        })
        .catch(() => {
            alert("An error occurred while fetching the city coordinates.");
        });
};

// Function to get user's geolocation and fetch weather data
const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;

            const REVERSE_GEOCODING_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_key}`;

            fetch(REVERSE_GEOCODING_URL)
                .then(res => res.json())
                .then(data => {
                    const { name } = data[0];
                    getWeatherDetails(name, latitude, longitude);
                })
                .catch(() => {
                    alert("An error occurred while fetching the city.");
                });
        },
        error => {
            if (error.code === error.PERMISSION_DENIED) {
                alert("Geolocation request failed");
            }
        }
    );
};

searchButton.addEventListener("click", getCityCoordinates);
locationButton.addEventListener("click", getUserCoordinates);
cityInput.addEventListener("keyup", e => e.key === "Enter" && getCityCoordinates());
