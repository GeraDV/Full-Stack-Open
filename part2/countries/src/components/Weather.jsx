import weatherService from "../services/weathers";
import { useEffect, useState } from "react";

const Weather = ({country}) => {
    const [weather, setWeather] = useState()

    console.log('Weather: ', country);
    useEffect(() => {
        weatherService
        .getCapital(country)
        .then(res => {
            setWeather(res)
        })
    }, [])

    return (
        <div>
            {
                weather?
                <>
                    <h3>Weather in {country.name.common}</h3>
                    temperature {(weather.main.temp - 273.15).toFixed(2)}° Celsius <br/>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`Image of ${weather.weather[0].description}`} />
                    <br/>
                    Description: <b>{weather.weather[0].main}</b>
                    <br />
                    wind: {weather.wind.speed} m/seg
                </>
                :null
            }
        </div>
    )
}

export default Weather;
