import "./App.css";
import Weather from "./Components/Weather";
import { useEffect, useState } from "react";

function App() {
  const [userLocation, setUserLocation] = useState("chennai");
  const [temp, setTemp] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [iconCode, setIconCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [noInternet, setNoInternet] = useState(false);

  const searchData = async () => {
    const api_key = import.meta.env.VITE_WEATHER_API_KEY;
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const Url = `${baseUrl}?q=${userLocation}&appid=${api_key}`;

    setNotFound(false);
    setLoading(true);
    setNoInternet(false);
    try {
      const response = await fetch(Url);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);

        const tempInKelvin = data.main.temp;
        const tempInCelsius = tempInKelvin - 273.15;
        const roundedTempInCelsius = Math.round(tempInCelsius);
        setTemp(roundedTempInCelsius);
        setLocation(data.name);
        setCountry(data.sys.country);
        setLat(data.coord.lat);
        setLon(data.coord.lon);
        setHumidity(data.main.humidity);
        setWind(data.wind.speed);
        setIconCode(data.weather[0].icon);
        console.log(iconCode);
      } else {
        if (response.status === 504) {
          setNoInternet(true);
        } else {
          setNotFound(true);
          throw new Error("Data has not Found");
        }
      }
    } catch (error) {
      if (!navigator.onLine) {
        setNoInternet(true);
        console.error("No internet connection");
      } else {
        console.error("Failed to fetch data:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchData();
  }, []);
  
  return (
    <>
      <Weather
        userLocation={userLocation}
        setUserLocation={setUserLocation}
        temp={temp}
        location={location}
        country={country}
        lat={lat}
        lon={lon}
        humidity={humidity}
        wind_speed={wind}
        iconCode={iconCode}
        onLoading={loading}
        onNotFound={notFound}
        onNoInternet={noInternet}
        onSetNotFound={setNotFound}
        onSearchData={searchData}
      />
    </>
  );
}

export default App;
