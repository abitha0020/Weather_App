import React, { useEffect, useState } from "react";
import { lineSpinner } from 'ldrs'
export default function CurrentLocation(){
    const [lat ,setLat] = useState(null);
    const [long ,setlong] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                setLat(position.coords.latitude);
                setlong(position.coords.longitude);
                console.log(' coordinates:', lat, long);
            }
        )
    },[]);

    useEffect(() => {
        const fetchData = async () => {
            if (lat !== null && long !== null){
                setLoading(true);
                console.log('Fetching weather data for coordinates:', lat, long);
                try{
                    const response = await fetch(
                        `${import.meta.env.VITE_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${import.meta.env.VITE_API_KEY}`
                    );
                    const result = await response.json();
                    setData(result);
                    setLoading(false);
                }
                catch(error){
                    console.log("error :", error);
                }
            }
        };
        fetchData();
    },[lat, long]);//dependent variables are in bracket
    

   lineSpinner.register()


    return (
        <div>  
            <div  className="w-[400px] p-10 h-[300px]  shadow-lg rounded-lg ">
                <h1 className="text-center font-bold text-2xl"> Weather Data</h1>
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
                        <p className="mt-2 text-center font-medium text-base">Current Location: {data.name}</p>
                        <p className="mt-2 text-center font-medium text-xl">{data.weather[0].description}</p>
                        <ul className="mt-5">
                            <li className="text-center">Temprature:  {data.main.temp}</li>
                            <li className="text-center">Pressure:  {data.main.pressure}</li>
                            <li className="text-center">Humidity:  {data.main.humidity}</li>
                            <li className="text-center">Wind Speed:  {data.wind.speed}</li>
                        </ul>                   
                    </div>  
                )
                }
            </div>
        </div>
    )};
