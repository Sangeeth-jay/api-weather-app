import React, { useRef, useState } from "react";
import axios from "axios";
import clear from "../assets/Clear.png";
import Rain from "../assets/Rain.png";
import Snow from "../assets/Snow.png";
import Clouds from "../assets/Clouds.png";
import Haze from "../assets/Haze.png";
import Mist from "../assets/Mist.png";
import Drizzle from "../assets/Drizzle.png";
import temp from "../assets/temp.png";
import Search from "../assets/Searchicon.png";

const WeatherForm = () => {
  const apikey = "b43bf992ce4a4505bc970030241103";

  const inputRef = useRef(null);
  const [apiData, setApiData] = useState({
    location: "",
    weather: "",
    temperature: "",
  });

  const getWeatherIcon = (icon) => {
    switch (icon) {
      case "Sunny":
        return clear;
      case "Partly cloudy":
        return Haze;
      case "Cloudy":
      case "Overcast":
        return Clouds;
      case "Mist":
      case "Haze":
        return Mist;
      case "Drizzle":
      case "Patchy rain nearby":
        return Drizzle;
      case "Rain":
        return Rain;
      case "Snow":
        return Snow;
      default:
        return null;
    }
  };

  const loadData = () => {
    if (!apiData.location) {
      return null;
    }

    return (
      <div className="text-center flex flex-col gap-6 mt-10">
        <p className="text-3xl font-semibold text-gray-400">{apiData.location}</p>
        <img src={getWeatherIcon(apiData.weather)} alt="" className="w-52 mx-auto" />
        <h3 className="text-5xl font-bold text-gray-600">{apiData.weather}</h3>
        <div className="flex justify-center">
          <img src={temp} alt="" className="h-9 mt-1" />
          <h2 className="text-4xl font-bold">{apiData.temperature}&#176;C</h2>
        </div>
      </div>
    );
  };

  const fetchWeather = async (e) => {
    e.preventDefault();
    const URL = `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${inputRef.current.value}`;

    try {
      const { data } = await axios.get(URL);
      const { location, current } = data;

      setApiData({
        location: location.name,
        weather: current.condition.text,
        temperature: current.temp_c,
      });

      inputRef.current.value = "";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 h-screen grid place-items-center">
      <div className="bg-white w-96 p-4 rounded-md shadow-md">
        <div className="flex">
          <input
            type="text"
            ref={inputRef}
            name=""
            placeholder="Enter City"
            className="text-xl border-none w-full focus:outline-none font-semibold text-gray-600"
          />
          <button onClick={fetchWeather}>
            <img src={Search} alt="" className="w-8" />
          </button>
        </div>
        <div>{loadData()}</div>
      </div>
    </div>
  );
};

export default WeatherForm;
