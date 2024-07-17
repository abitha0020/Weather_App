import React from "react";

const Weather = ({ weatherData }) => {
  return (
    <div>
      <h1>Weather Data</h1>
      <p>{weatherData.weather[0].description}</p>
    </div>
  );
};

export default Weather;
