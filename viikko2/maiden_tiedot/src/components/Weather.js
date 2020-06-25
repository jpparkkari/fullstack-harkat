import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({city}) => {

    const [weather, setWeather] = useState({current: {temperature: '', wind_speed: '', wind_dir: '', weather_icons: '', weather_descriptions: ''}})

    useEffect (() => {
        
        const params ={
          access_key: process.env.REACT_APP_API_KEY,
          query: city
        }

        axios
          .get('http://api.weatherstack.com/current', {params})
          .then(response => {
            setWeather(response.data)
        })
    }, [])

    return (
    <div>
        <h2>weather in {city}</h2>
        <div><b>temperature: </b> {weather.current.temperature} Celsius</div>
        <img src={weather.current.weather_icons} alt={weather.current.weather_descriptions}></img>
        <div><b>wind: </b>{weather.current.wind_speed} km/h direction {weather.current.wind_dir}</div>
    </div>
    )
}

export default Weather