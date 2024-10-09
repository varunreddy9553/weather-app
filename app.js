//OpenWeatherMap API key and API URL
const apiKey = "913fb2119853786a60057a0c0d0a9d60";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//selecting HTML elements
const cityName= document.querySelector(".city")
const temp = document.querySelector(".temp")
const humidity = document.querySelector(".humidity")
const wind = document.querySelector(".wind")
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button"); 
const weatherIcon = document.querySelector(".weather-icon")

//Async function to fetch and display weather information
async function checkWeather(city) {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`)
    
    //Error handling: Display error message if city not found
    if(response.status == 404){
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    }else{
        let data = await response.json();
        
    //Displaying weather data in the HTML elements
    cityName.innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp) + "°c";
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + "km/h";

    //Updating the weather icon based on the weather condition
    switch (data.weather[0].main) {
        case "Clear":
            weatherIcon.src = url("icons/clear.png");            
            break;
        case "Clouds":
            weatherIcon.src = "icons/clouds.jpeg";            
            break;
        case "Rain":
            weatherIcon.src = "icons/rain.jpeg";            
            break;
        case "Drizzle":
            weatherIcon.src = "icons/drizzle.jpeg";            
            break;
        case "Mist":
            weatherIcon.src = "icons/mist.jpeg";            
            break;       
    } 

    //Displaying weather information and hiding the error message
     document.querySelector(".weather").style.display = "block";
     document.querySelector(".error").style.display = "none";
    }
    
}

//Event listener for the search button to trigger weather check
searchBtn.addEventListener("click", ()=> {
    checkWeather(searchBox.value);
})