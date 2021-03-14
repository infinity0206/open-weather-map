const Weather = (props) => (
    <>
        <ul>
            {Object.keys(props.data.list).map(key => (
                <li key={key}>
                    気温: {props.data.list[key].main.temp}
                    体感気温: {props.data.list[key].main.feels_like}
                    最低気温: {props.data.list[key].main.temp_min}
                    最高気温: {props.data.list[key].main.temp_max}
                    気圧: {props.data.list[key].main.pressure}
                    sea_level: {props.data.list[key].main.sea_level}
                    grnd_level: {props.data.list[key].main.grnd_level}
                    湿度: {props.data.list[key].main.humidity}
                </li>
            ))}
        </ul>
    </>
)

Weather.getInitialProps = async function(){
    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=Tokyo&units=metric&APPID=${process.env.APPID}`);
    const data = await response.json();
    return { data : data };
}

export default Weather; 