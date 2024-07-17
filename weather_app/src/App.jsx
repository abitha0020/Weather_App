import React, { useState, useEffect } from "react";
import Weather from './components/weather.jsx';

function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [data, setData] = useState(null);
  const [locationPermission, setLocationPermission] = useState(true);
  const [locationInput, setLocationInput] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        console.log('Geolocation obtained:', position.coords.latitude, position.coords.longitude);
      },
      function(error) {
        if (error.code === error.PERMISSION_DENIED) {
          setLocationPermission(false);
          console.error('Geolocation permission denied');
        }
      }
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (locationInput.trim() !== "") {
        console.log('Fetching weather data for location:', locationInput);
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/weather?q=${encodeURIComponent(locationInput)}&units=metric&APPID=${import.meta.env.VITE_API_KEY}`
          );
          const result = await response.json();
          setData(result);
          console.log('Weather data fetched:', result);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      } else if (lat !== null && long !== null) {
        console.log('Fetching weather data for coordinates:', lat, long);
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${import.meta.env.VITE_API_KEY}`
          );
          const result = await response.json();
          setData(result);
          console.log('Weather data fetched:', result);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      } else {
        console.log('Location input and geolocation are not available.');
      }
    };

    if (locationInput.trim() !== "" || (lat !== null && long !== null)) {
      fetchData();
    }
  }, [lat, long, locationInput]);

  const handleLocationChange = (event) => {
    setLocationInput(event.target.value);
  };

  const handleLocationSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <div className="App">
      {!locationPermission ? (
        <div>
          Please enable location access to view weather data. You can reset
          permissions by clicking the lock icon next to the URL.
        </div>
      ) : (
        <div className="mt-20">
          <form onSubmit={handleLocationSubmit} className="mx-auto p-10 w-[500px] h-[250px] flex flex-col justify-evenly bg-[#F8EDE3] shadow-md">
            <label className="font-medium text-l flex gap-2">
              <p>Enter location:  </p>
              <input
                type="text"
                value={locationInput}
                onChange={handleLocationChange}
                className="border border-black"
              />
            </label>
            <button type="submit" className="mx-auto w-[150px] h-[50px] bg-[#DAD3BE] rounded-xl font-medium text-xl hover:bg-[#6B8A7A]">Get Weather</button>
          </form>
        </div>
      )}

      {data && data.main ? (
        <div className="">
          <Weather weatherData={data} />
        </div>
      ) : (
        <div className="mt-20">
          <p className="text-center">Loading...</p>
        </div>
      )}
    </div>
  );
}

export default App;
