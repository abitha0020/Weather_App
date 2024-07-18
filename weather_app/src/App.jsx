import React, { useState, useEffect } from "react";
import LocationInput from "./components/locationInput.jsx";
import CurrentLocation from "./components/currentlocation.jsx";
import WeatherWidget from "./components/weatherwidget.jsx";
import Navbar from "./components/navbar.jsx";

function App() {
  const [locationData, setLocationData] = useState(null);
  const [data ,setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const onLocationChange = (location) =>{
    setLocationData(location);
  }
  console.log(locationData);
  useEffect( () =>{
    const fetchData = async() =>{
      if (locationData!==null) {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/weather?q=${encodeURIComponent(locationData)}&units=metric&APPID=${import.meta.env.VITE_API_KEY}`
        );
        const result = await response.json();
        console.log('Weather data fetched:', result);
        setData(result);
        setLoading(false);
     }
    }
    fetchData(); 
    console.log(data)
  },[locationData]);

  return (
    <div className="">
      <Navbar />
      <div className="flex mt-10 px-10">
        <div>
          <CurrentLocation />
        </div>
        <div className="p-10">
          <LocationInput onLocationChange={onLocationChange}/>
          { loading? (
            <div className="flex  place-content-center mt-10">
              <l-line-spinner style={{
              size:"40",
              stroke:"3",
              speed:"1", 
              color:"black"
              }} ></l-line-spinner>
            </div>
          ) : (
            <div>
              <div><p className="font-medium text-3xl text-center p-10">{data.weather[0].description}</p></div>
              <div className="flex place-content-center gap-4">
                <div className="flex flex-col gap-4">
                  <WeatherWidget title={"Temprature"} value={data.main.temp} />
                  <WeatherWidget title={"Pressure"} value={data.main.pressure} />
                </div>
                <div className="flex flex-col gap-4">
                  <WeatherWidget title={"Humidity"} value={data.main.humidity} />
                  <WeatherWidget title={"Wind Speed"} value={data.wind.speed} />
                </div>
              </div>
            </div>
          ) }        
        </div>
      </div>
    </div>
  );
}

export default App;
