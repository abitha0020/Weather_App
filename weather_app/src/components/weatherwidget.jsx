export default function WeatherWidget(props) {
    return(
        <div className="border border-black h-[200px] w-[250px]">
            <h2>{props.title}</h2>
            <p>{props.value}</p>
        </div>
    );
} 