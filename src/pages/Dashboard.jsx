import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  const { t } = useTranslation();

  // Live sensor states (numbers only)
  const [ph, setPh] = useState(6.5);
  const [temperature, setTemperature] = useState(5.3);
  const [tds, setTds] = useState(450);
  const [turbidity, setTurbidity] = useState(120);

  // Simulated Live Update (Safe Version)
  useEffect(() => {
    const interval = setInterval(() => {
      setPh((prev) => Number((prev + (Math.random() - 0.5) * 0.1).toFixed(2)));
      setTemperature((prev) =>
        Number((prev + (Math.random() - 0.5) * 0.2).toFixed(2))
      );
      setTds((prev) =>
        Number((prev + (Math.random() - 0.5) * 10).toFixed(0))
      );
      setTurbidity((prev) =>
        Number((prev + (Math.random() - 0.5) * 5).toFixed(0))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Quality Logic (Basic Demo)
  const getQuality = () => {
    if (ph < 6.4 || temperature > 10) return "poor";
    if (ph < 6.6) return "medium";
    return "good";
  };

  const quality = getQuality();

  const qualityColor =
    quality === "good"
      ? "bg-green-100 text-green-700"
      : quality === "medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="min-h-screen bg-[#fefae0]">
      <Navbar />

      <div className="pt-28 px-6 max-w-7xl mx-auto">

        {/* Page Title */}
        <h2 className="text-3xl font-bold text-green-900 text-center mb-10">
          📊 {t("dashboard")}
        </h2>

        {/* Sensor Section */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
          <h3 className="text-2xl font-semibold text-green-800 mb-8 text-center">
            🌾 Live Sensor Readings
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

            <SensorCard title="pH" value={ph} unit="" color="text-blue-700" />
            <SensorCard title="Temperature" value={temperature} unit="°C" color="text-purple-700" />
            <SensorCard title="TDS" value={tds} unit="ppm" color="text-indigo-700" />
            <SensorCard title="Turbidity" value={turbidity} unit="NTU" color="text-orange-600" />

          </div>
        </div>

        {/* Quality Section */}
        <div className={`rounded-2xl shadow-md p-10 text-center ${qualityColor}`}>
          <h3 className="text-2xl font-semibold mb-4">
            🤖 {t("milk_quality")}
          </h3>

          <p className="text-4xl font-bold mb-4">
            {t(quality)}
          </p>

          <p className="text-lg">
            {quality === "good" &&
              "Milk is safe and suitable for sale."}

            {quality === "medium" &&
              "Milk quality is moderate. Please monitor carefully."}

            {quality === "poor" &&
              "Milk quality is poor. Immediate action required."}
          </p>
        </div>

      </div>

      <Footer />
    </div>
  );
}

// Reusable Sensor Card Component
function SensorCard({ title, value, unit, color }) {
  return (
    <div className="bg-green-50 rounded-xl shadow-sm p-6 text-center hover:shadow-lg transition duration-300">
      <h4 className="text-lg font-semibold text-gray-700 mb-2">
        {title}
      </h4>
      <p className={`text-3xl font-bold ${color}`}>
        {value} {unit}
      </p>
    </div>
  );
}

export default Dashboard;
