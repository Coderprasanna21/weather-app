import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import clearSkyIcon from "../assets/clear-sky.png";
import fewCloudsIcon from "../assets/few-clouds.png";
import scatteredCloudsIcon from "../assets/scattered-clouds.png";
import brokenCloudsIcon from "../assets/broken-clouds.png";
import showerRainIcon from "../assets/shower-rain.png";
import rainIcon from "../assets/rain.png";
import thunderstormIcon from "../assets/thunderstorm.png";
import snowIcon from "../assets/snow.png";
import mistIcon from "../assets/mist.png";
import clearSkyNight from "../assets/clearsky-night.png";
import nightCloudsIcon from "../assets/nightclouds.png";
import rainyNightIcon from "../assets/rainy-night.png";
import humidityIcon from "../assets/humidity.png";
import windIcon from "../assets/wind.png";
import cityNotFound from "../assets/city-not-found.png";
import noInternet from "../assets/no-internet.png";
import loader from "../assets/Sunny.gif";

const Weather = ({
  userLocation,
  setUserLocation,
  temp,
  location,
  country,
  lat,
  lon,
  humidity,
  wind_speed,
  iconCode,
  onLoading,
  onNotFound,
  onNoInternet,
  onSearchData,
}) => {
  const handleChange = (e) => {
    setUserLocation(e.target.value);
    console.log(userLocation);
  };
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearchData();
    }
  };
  const handleButtonClick = () => {
    onSearchData();
  };

  const weatherTempIconCode = {
    "01d": clearSkyIcon,
    o1n: clearSkyNight,
    "02d": fewCloudsIcon,
    "02n": nightCloudsIcon,
    "03d": scatteredCloudsIcon,
    "03n": scatteredCloudsIcon,
    "04d": brokenCloudsIcon,
    "04n": brokenCloudsIcon,
    "09d": showerRainIcon,
    "09n": showerRainIcon,
    "10d": rainIcon,
    "10n": rainyNightIcon,
    "11d": thunderstormIcon,
    "11n": thunderstormIcon,
    "13d": snowIcon,
    "13n": snowIcon,
    "50d": mistIcon,
    "50n": mistIcon,
  };
  return (
    <div className="container">
      <h2 className="title">Weather App</h2>
      <form className="form">
        <input
          type="text"
          placeholder="Search Location.."
          id="input-box"
          onChange={handleChange}
          value={userLocation}
          onKeyDown={handleSearch}
        />
        <div className="search-icon">
          <IconButton aria-label="search" onClick={handleButtonClick}>
            <SearchIcon className="search" />
          </IconButton>
        </div>
      </form>

      <div className="temp-img">
        <img
          src={
            weatherTempIconCode[iconCode]
              ? weatherTempIconCode[iconCode]
              : clearSkyIcon
          }
          alt="sun-icon"
        />
      </div>
      <div className="weather-details">
        <span className="tempr">{`${temp}°C`}</span>
        <span className="location">{location}</span>
        <span className="country">{country}</span>
      </div>
      <div className="lat-lon">
        <div className="lat">
          <p>Lattitude</p>
          <span>{lat}</span>
        </div>
        <div className="lon">
          <p>Longitude</p>
          <span>{lon}</span>
        </div>
      </div>
      <div className="other-detail">
        <div className="humidity">
          <img src={humidityIcon} alt="humidity" />
          <p>Humidity</p>
          <span>{`${humidity}%`}</span>
        </div>
        <div className="wind-speed">
          <img src={windIcon} alt="windy" />
          <p>Wind Speed</p>
          <span>{`${wind_speed}km/h`}</span>
        </div>
      </div>
      {onLoading && (
        <div className="loader-container">
          <span className="loader">
          <img src={loader} alt="loader" />
          </span>
          <p>Please Wait..!!</p>
        </div>
      )}
      {onNotFound && (
        <div className="notfound ">
          <img src={cityNotFound} alt="citynotFound" />
          <p>City Not Found</p>
        </div>
      )}
      {onNoInternet && (
        <div className="nointernet ">
          <img src={noInternet} alt="nointernet" />
          <p>No internet Connection</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
