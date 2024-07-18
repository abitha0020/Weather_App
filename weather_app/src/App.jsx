import React, { useState, useEffect } from "react";
import LocationInput from "./components/locationInput.jsx";
import CurrentLocation from "./components/currentlocation.jsx";
import WeatherWidget from "./components/weatherwidget.jsx";

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
    <div className="App flex">
      <div>
        <CurrentLocation />
      </div>
      <LocationInput onLocationChange={onLocationChange}/>
      <div>
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
          <WeatherWidget title={"Temprature"} value={data.main.temp} />
        ) }        
      </div>
    </div>
  );
}

export default App;
