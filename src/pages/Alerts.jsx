import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Alerts() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const [ph, setPh] = useState(6.5);
  const [temperature, setTemperature] = useState(8);
  const [alertHistory, setAlertHistory] = useState([]);
  const [smsStatus, setSmsStatus] = useState("");

  const smsSentRef = useRef(false); // Prevent repeated SMS

  // 🔹 Simulate real-time sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newPh = Number((6 + Math.random()).toFixed(2));
      const newTemp = Number((8 + Math.random() * 6).toFixed(1));

      setPh(newPh);
      setTemperature(newTemp);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 🔹 Determine alert level
  const getAlertLevel = () => {
    if (ph < 6.4 || temperature > 10) return "danger";
    if (ph < 6.6) return "warning";
    return "safe";
  };

  const level = getAlertLevel();

  // 🔹 Handle Voice + History + SMS
  useEffect(() => {
    const newAlert = {
      time: new Date().toLocaleTimeString(),
      ph,
      temperature,
    };

    setAlertHistory((prev) => [newAlert, ...prev.slice(0, 9)]);

    if (level === "danger") {
      // 🔊 Voice Alert
      const voiceMessage =
        currentLang === "ta"
          ? "அபாயம்! பால் தரம் மோசமாக உள்ளது. உடனே பரிசோதிக்கவும்."
          : "Danger! Milk quality is poor. Please check immediately.";

      const speech = new SpeechSynthesisUtterance(voiceMessage);
      speech.lang = currentLang === "ta" ? "ta-IN" : "en-US";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(speech);

      // 📱 Send SMS only once during danger
      if (!smsSentRef.current) {
        sendSMS(ph, temperature);
        smsSentRef.current = true;
      }
    } else {
      smsSentRef.current = false; // Reset when safe
    }

  }, [ph, temperature, level]);

  // 🔹 Send SMS to Backend
  const sendSMS = async (phValue, tempValue) => {
    try {
      await axios.post("http://localhost:5000/send-sms", {
        ph: phValue,
        temperature: tempValue,
      });

      setSmsStatus(
        currentLang === "ta"
          ? "SMS அனுப்பப்பட்டது"
          : "SMS Sent Successfully"
      );
    } catch (err) {
      setSmsStatus(
        currentLang === "ta"
          ? "SMS அனுப்புவதில் தோல்வி"
          : "SMS Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#fefae0]">
      <Navbar />

      <div className="pt-28 px-6 max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-center text-green-900 mb-10">
          🚨 {currentLang === "ta"
            ? "எச்சரிக்கை தகவல்"
            : "Alert Information"}
        </h2>

        {/* 🔴 ALERT BOX */}
        <div
          className={`p-8 rounded-2xl shadow-lg mb-12 ${
            level === "danger"
              ? "bg-red-100 border-l-8 border-red-600"
              : level === "warning"
              ? "bg-yellow-100 border-l-8 border-yellow-600"
              : "bg-green-100 border-l-8 border-green-600"
          }`}
        >
          <h3 className="text-2xl font-bold mb-4">
            {level === "danger"
              ? currentLang === "ta"
                ? "அபாயம்"
                : "DANGER"
              : level === "warning"
              ? currentLang === "ta"
                ? "எச்சரிக்கை"
                : "WARNING"
              : currentLang === "ta"
              ? "பாதுகாப்பானது"
              : "SAFE"}
          </h3>

          <p className="text-lg">pH: {ph}</p>
          <p className="text-lg">Temperature: {temperature}°C</p>

          {smsStatus && (
            <p className="mt-4 font-semibold text-blue-700">
              📱 {smsStatus}
            </p>
          )}
        </div>

        {/* 📋 ALERT HISTORY TABLE */}
        <div className="mb-16">
          <h3 className="text-xl font-bold mb-6">
            {currentLang === "ta"
              ? "முந்தைய எச்சரிக்கைகள்"
              : "Alert History"}
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow rounded-lg">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="p-3">Time</th>
                  <th className="p-3">pH</th>
                  <th className="p-3">Temp</th>
                </tr>
              </thead>
              <tbody>
                {alertHistory.map((item, index) => (
                  <tr key={index} className="text-center border-b">
                    <td className="p-2">{item.time}</td>
                    <td>{item.ph}</td>
                    <td>{item.temperature}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 📊 GRAPH */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-bold mb-6">
            {currentLang === "ta"
              ? "எச்சரிக்கை வரைபடம்"
              : "Alert Trend Graph"}
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={alertHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="ph" stroke="#ef4444" />
              <Line type="monotone" dataKey="temperature" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default Alerts;
