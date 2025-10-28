import { useEffect, useRef, useState } from "react";
import cloudy from '../images/cloudy.png';
import loading from '../images/loading.gif';
import rainy from '../images/rainy.png';
import snowy from '../images/snowy.png';
import sunny from '../images/sunny.png';





function WeatherApp() {

    const apikey = "65309afcdbbcd46417f052a3931e7438";
    const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";




    const [city, setCity] = useState("New Delhi");

    const [data, setData] = useState({});


    useEffect(() => { getData() }, [city])

    const inputRef = useRef(null)
    function handleSearch() {
        let text = inputRef.current.value;
        if (text === "") {
            return (

                alert("Please Enter City")
            )
        }
        setCity(text)
    }


    const getData = async () => {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);
        const result = await response.json()
        console.log(result);
        setData(result);
    }

    // Background image logic based on weather condition
    let bgImage = sunny; // default

    if (data.weather && data.weather[0]) {
        const condition = data.weather[0].main.toLowerCase();

        if (condition.includes("cloud")) {
            bgImage = cloudy;
        } else if (condition.includes("rain")) {
            bgImage = rainy;
        } else if (condition.includes("snow")) {
            bgImage = snowy;
        } else if (condition.includes("clear")) {
            bgImage = sunny;
        } else {
            bgImage = sunny; // fallback image
        }
    }

    const backgroundImages = {
        Clear: "linear-gradient(to right, #f3b07c, #fcd283)",
        Clouds: "linear-gradient(to right, #57d6d4, #71eeec)",
        Rain: "linear-gradient(to right, #5bc8fb, #80eaff)",
        Snow: "linear-gradient(to right, #aff2ff, #fff)",
        Haze: "linear-gradient(to right, #57d6d4, #71eeec)",
        Mist: "linear-gradient(to right, #57d6d4, #71eeec)"
    };

    const weatherName = data.weather?.[0]?.main || "Clear";

    const backgroundStyle = {
        background: backgroundImages[weatherName] || backgroundImages["Clear"],
    };


    return (
        <div className="h-screen w-full relative flex items-center justify-center  " style={backgroundStyle}>


            <div className=" lg:h-[90%] h-full w-md relative outline-none rounded-3xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg">

                <div className="h-full w-full mx-auto  absolute">

                    <div className="h-screen mx-auto w-full z-0 absolute">
                        <img src={bgImage} alt="background" className="h-screen w-full object-cover" />
                    </div>


                    <div className="h-screen w-full relative z-20    top-0 bottom-0 left-0 right-0">
                        <div className="flex items-center justify-between mx-auto border-2 w-76 mt-3 rounded-2xl p-2 pr-2">
                            <input ref={inputRef} className=" h-10 p-5 border-none outline-none rounded-2xl" type="text" name="" id="" placeholder="Enter City" />
                            <i onClick={handleSearch} class="fa-solid fa-magnifying-glass "></i>
                        </div>

                        <div className=" w-fit mt-44 mx-auto  space-y-5">
                            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 h-20 text-center w-64">
                                {data.main ? (<h1 className="text-3xl">{data.weather[0].main}</h1>) : (<h1>Loading</h1>)}
                            </div>
                            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6  h-32 text-center w-64">
                                <h1 className="text-2xl">Temp</h1>
                                {
                                    data.main ?
                                        (<h1 className="text-3xl">{data.main.temp}</h1>) :
                                        (<h1>Loading...</h1>)
                                }
                            </div>
                        </div>

                        <div className=" flex itec justify-around mt-5">
                            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 h-28 text-center w-34">
                                <h1>Wind</h1>
                                <i class="fa-solid fa-wind"></i>
                                {
                                    data.main ?
                                        (<h1 className="text-2xl">{data.wind.speed}</h1>) :
                                        (<h1>Loading...</h1>)
                                }
                            </div>

                            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 h-28 text-center w-34">
                                <h1>Humidity</h1>
                                <i class="fa-solid fa-droplet"></i>
                                {
                                    data.main ?
                                        (<h1 className="text-2xl">{data.main.humidity}</h1>) :
                                        (<h1>Loading...</h1>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>





        </div>
    )


}

export default WeatherApp;