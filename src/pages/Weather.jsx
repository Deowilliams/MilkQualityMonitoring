import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import axios from "axios";

function Weather() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Chennai");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Weather API Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="min-h-screen bg-[#fefae0]">
      <Navbar />

      <div className="pt-28 px-6 max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-green-900 text-center mb-10">
          🌦 {currentLang === "ta" ? "வானிலை தகவல்" : "Weather Information"}
        </h2>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={
              currentLang === "ta"
                ? "நகரத்தை உள்ளிடவும்"
                : "Enter city"
            }
            className="p-3 border rounded-l-lg w-64"
          />

          <button
            onClick={fetchWeather}
            className="bg-green-700 text-white px-6 rounded-r-lg hover:bg-green-800"
          >
            {currentLang === "ta" ? "தேடுக" : "Search"}
          </button>
        </div>

        {/* Weather Card */}
        {loading && (
          <p className="text-center">
            {currentLang === "ta" ? "ஏற்றப்படுகிறது..." : "Loading..."}
          </p>
        )}

        {weather && (
          <div className="bg-white shadow-lg rounded-2xl p-10 text-center">

            <h3 className="text-2xl font-semibold mb-4">
              {weather.name}
            </h3>

            <p className="text-5xl font-bold text-green-700 mb-4">
              {weather.main.temp}°C
            </p>

            <p className="text-lg mb-6 capitalize">
              {weather.weather[0].description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg">

              <div>
                <p className="font-semibold">
                  {currentLang === "ta" ? "ஈரப்பதம்" : "Humidity"}
                </p>
                <p>{weather.main.humidity}%</p>
              </div>

              <div>
                <p className="font-semibold">
                  {currentLang === "ta" ? "காற்றின் வேகம்" : "Wind Speed"}
                </p>
                <p>{weather.wind.speed} m/s</p>
              </div>

              <div>
                <p className="font-semibold">
                  {currentLang === "ta" ? "அழுத்தம்" : "Pressure"}
                </p>
                <p>{weather.main.pressure} hPa</p>
              </div>

            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}

export default Weather;
