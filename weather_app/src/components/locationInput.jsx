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
        <div className="w-[1000px] flex justify-between">
            <div>
                <label htmlFor="location" className="font-medium text-base">Enter Location To Search: </label>
                <input type="text"id="location" value={location} onChange={handleChange}/>
            </div>
            <button onClick={handleclick} className="w-[140px] h-[30px] leading-6 text-[17px] tracking-[0.2px] border border-black"> search</button>
        </div>
    );
};