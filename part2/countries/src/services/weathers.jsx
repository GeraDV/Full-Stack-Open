import axios from "axios";

const getCapital = (country) => {
    const apiURL = import.meta.env.VITE_WEATHER_API;
    const apiKey = import.meta.env.VITE_WEATHER_KEY;

    console.log('getCapital: ', country);
    const [lat, lon] = country.capitalInfo.latlng
    console.log(lat);
    console.log(lon);
    console.log(`${apiURL}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);

    return (
        axios
        .get(`${apiURL}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(res => res.data)
    )
}

export default {getCapital}