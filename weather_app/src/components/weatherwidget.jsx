export default function WeatherWidget(props) {
    return(
        <div className="border border-black h-[100px] w-[250px]">
            <h2 className="text-center p-3">{props.title}</h2>
            <p className="text-center">{props.value}</p>
        </div>
    );
} 