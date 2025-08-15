import React, { useState } from 'react';
import axios from 'axios';

export default function Weather() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);

    const handleCityName = (event) => {
        setCity(event.target.value);
    };

    const fetchWeather = async () => {
        try {
            const response = await axios.get(
      `${process.env.REACT_APP_OPEN_WEATHER_URL}?q=${city}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`);
            setWeather(response.data);
        } catch (error) {
            console.log("Error fetching weather data", error);
        }
    };

    const handleClick = () => {
        fetchWeather();
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className='weather-container'>
            <input
                type='text'
                placeholder='Enter City Name'
                value={city}
                onChange={handleCityName}
            />
            <button onClick={handleClick}>Get Weather</button>

            {weather && (
                <div className='weather-info visible'>
                    <h2>{weather.name}</h2>
                    <p className="temp">{weather.main.temp} °C</p>
                    <p className="description">{weather.weather[0].description}</p>

                    <div className="extra-details">
                        <p>☁ Clouds: {weather.clouds.all}%</p>
                        <p>💧 Humidity: {weather.main.humidity}%</p>
                        <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
                        <p>🌅 Sunrise: {formatTime(weather.sys.sunrise)}</p>
                        <p>🌇 Sunset: {formatTime(weather.sys.sunset)}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
