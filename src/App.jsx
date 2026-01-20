import { useEffect, useState } from "react";
import clear from "./assets/clear.jpg";
import clouds from "./assets/clouds.jpg";
import clouds2 from "./assets/clouds.jpg";
import fog from "./assets/fog.jpg";
import smoke from "./assets/smoke.jpg";
import haze from "./assets/haze.jpg";
import rain from "./assets/rain.jpg";
import snow from "./assets/snow.jpg";
import snow2 from "./assets/snow2.jpg";

function App() {

  const apikey = "65309afcdbbcd46417f052a3931e7438";
  const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const [city, setCity] = useState("Mumbai");
  const [userInput, setUserinput] = useState("")
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [bg, setBg] = useState(smoke)

  useEffect(() => {
    getData();
  }, [])

  const getData = async (searchCity = city) => {
    try {
      setError("");
      let response = await fetch(`${apiurl}${searchCity}&appid=${apikey}`);
      if (!response.ok) {
        throw new Error("City Not Found");
      }
      response = await response.json();
      setData(response);

      const condition = response?.weather?.[0]?.main;
      setBg(getBg(condition))
      setUserinput("")

    } catch (error) {
      setError("❌ City not found. Please enter a valid city name.");

      setTimeout(() => {
        setError("");
        setCity("Mumbai")
        getData("Mumbai")
        setUserinput("")
      }, 2000);

    }
  }

  const getBg = (condition) => {
    switch (condition?.toLowerCase()) {
      case "clear":
        return clear
        break;
      case "clouds":
        return clouds
        break;
      case "smoke":
        return smoke
        break;
      case "haze":
        return haze
        break;
      case "rain":
        return rain
        break;
      case "snow":
        return snow
        break;

      default:
        return smoke;
        break;
    }
  }


  return (
    <>
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="min-h-screen w-full 
             bg-center bg-cover bg-no-repeat 
             flex items-center justify-center 
             p-4 text-white"
      >
        <div
          className="w-full max-w-lg lg:max-w-3xl
               bg-white/10 backdrop-blur-xl 
               border border-white/20 
               rounded-3xl 
               shadow-2xl 
               p-6 sm:p-8 md:p-10"
        >

          <div className="text-center mb-6 sm:mb-8">
            <p className="text-xs sm:text-base text-white/70">
              📍 Current Location
            </p>

            <h2 className="text-2xl sm:text-4xl font-bold tracking-wide leading-tight mt-1">
              {city} , {data?.sys?.country ? data.sys.country : "Loading"}
            </h2>

            <p className="text-sm sm:text-xl mt-1 text-white/80 capitalize">
              {data?.weather?.[0]?.description ?? ""}
            </p>
          </div>

          <div className="mb-6 sm:mb-10">
            <div className="flex flex-col sm:flex-row items-center gap-3">

              <input
                value={userInput}
                onChange={(e) => setUserinput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (setCity(userInput), getData(userInput))}
                type="text"
                placeholder="🔍 Search city..."
                className="w-full sm:flex-1 
                     px-5 py-3 
                     text-base sm:text-lg 
                     rounded-2xl 
                     bg-white/20 border border-white/30 
                     outline-none placeholder-white/60 
                     focus:ring-2 focus:ring-white/40 transition-all"
              />

              <button
                onClick={() => {
                  setCity(userInput);
                  getData(userInput);
                }}
                className="cursor-pointer 
                     w-full sm:w-auto 
                     px-8 py-3 
                     text-base sm:text-lg 
                     rounded-2xl 
                     bg-white/30 hover:bg-white/40 
                     transition-all border border-white/30 
                     flex items-center justify-center gap-2 font-medium"
              >
                <span>Search</span>
              </button>

            </div>

            {error && (
              <p className="mt-2 text-center text-sm text-red-400 font-medium">
                {error}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

            <div className="bg-white/15  flex flex-col items-center justify-center border border-white/20 rounded-2xl p-4 text-center order-2 sm:order-1">
              <p className="text-xs md:text-2xl sm:text-sm text-white/70 mb-1">
                🌡️ Min
              </p>
              <h3 className="text-xl md:text-4xl sm:text-2xl font-bold">
                {data?.main?.temp_min ?? "--"}°
              </h3>
            </div>

            <div className="bg-white/25 border border-white/30 rounded-2xl p-6 text-center shadow-lg order-1 sm:order-2">
              <p className="text-sm  sm:text-base text-white/80 mb-1">
                🔥 Now
              </p>
              <h3 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                {data?.main?.temp ?? "--"}°
              </h3>
              <p className="text-xs sm:text-sm text-white/70 mt-2">
                Feels {data?.main?.feels_like ?? "--"}°
              </p>
            </div>

            <div className="bg-white/15 flex flex-col items-center justify-center border border-white/20 rounded-2xl p-4 text-center order-3 sm:order-3">
              <p className="text-xs md:text-2xl sm:text-sm text-white/70 mb-1">
                ❄️ Max
              </p>
              <h3 className="text-xl md:text-4xl sm:text-2xl font-bold">
                {data?.main?.temp_max ?? "--"}°
              </h3>
            </div>

          </div>

          <div
            className="grid grid-cols-2 gap-4 sm:gap-6 
               bg-white/10 border border-white/20 
               rounded-2xl 
               p-5 sm:p-8"
          >

            <div className="flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left gap-1">
              <span className="text-xs sm:text-base text-white/70">💧 Humidity</span>
              <span className="text-sm sm:text-lg font-semibold">
                {data?.main?.humidity ?? "--"}%
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left gap-1">
              <span className="text-xs sm:text-base text-white/70">🌬️ Wind</span>
              <span className="text-sm sm:text-lg font-semibold text-nowrap">
                {data?.wind?.speed ?? "--"} km/h
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left gap-1">
              <span className="text-xs sm:text-base text-white/70">🧭 Pressure</span>
              <span className="text-sm sm:text-lg font-semibold">
                {data?.main?.pressure ?? "--"}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left gap-1">
              <span className="text-xs sm:text-base text-white/70">👁️ Visibility</span>
              <span className="text-sm sm:text-lg font-semibold">
                {(data?.visibility / 1000).toFixed(1) ?? "--"} km
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left gap-1">
              <span className="text-xs sm:text-base text-white/70">🧠 Feels</span>
              <span className="text-sm sm:text-lg font-semibold">
                {data?.main?.feels_like ?? "--"}°
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left gap-1">
              <span className="text-xs sm:text-base text-white/70">⛅ Condition</span>
              <span className="text-sm sm:text-lg font-semibold">
                {data?.weather?.[0]?.main ?? "--"}
              </span>
            </div>

          </div>

        </div>
      </div>

    </>
  )
}

export default App