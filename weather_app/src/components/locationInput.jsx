import React, {useState} from "react";
export default function LocationInput({onLocationChange}) {
    const [location, setLocation] = useState("");
    const handleChange = (e) =>{
        setLocation(e.target.value)
    }
    const handleclick = () => {
        onLocationChange(location)
    }

    return (
        <div>
            <label htmlFor="location">Enter Location To Search</label>
            <input type="text"id="location" value={location} onChange={handleChange}/>
            <button onClick={handleclick}> search</button>
        </div>
    );
};