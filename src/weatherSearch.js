import React, { useState } from "react";
import axios from "axios";
import "./App";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${
        response.data.weather[0].icon
      }@2x.png`,
      description: response.data.weather[0].description
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "094780c710fa4efd669f0df8c3991927";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form className="searchContainer" onSubmit={handleSubmit}>
      <input type="search" placeholder=" 🔍  Enter a city.." onChange={updateCity} />
      <button type="Submit">Search</button>
    </form>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <div className="gridContainer"> 
          <div>Temperature: {Math.round(weather.temperature)}°C</div>
          <div>Description: {weather.description}</div>
          <div>Humidity: {weather.humidity}%</div>
          <div>Wind: {weather.wind}km/h</div>
          <div>
            <img src={weather.icon} alt={weather.description} />
         </div>
         <div>
            <p>Enjoy the weather...</p>
         </div>
        </div>
        
      </div>
    );
  } else {
    return form;
  }
}
