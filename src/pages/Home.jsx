import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";


function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fefae0]">

      {/* Hero Section */}
      <section className="bg-green-800 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          🥛 Smart Milk Quality Monitoring
        </h1>

        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
          Ensure safe dairy production using IoT sensors and Machine Learning.
          Real-time monitoring for farmers in English and Tamil.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-500 transition"
        >
          {t("login")}
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        <FeatureCard
          title="📊 Real-Time Monitoring"
          desc="Live sensor readings from pH, Temperature, TDS and Turbidity."
        />

        <FeatureCard
          title="🤖 ML Quality Prediction"
          desc="Random Forest model predicts milk quality instantly."
        />

        <FeatureCard
          title="📱 SMS Alerts"
          desc="Automatic alerts if milk quality is poor."
        />

      </section>
      <Footer />
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition">
      <h3 className="text-xl font-bold text-green-800 mb-4">{title}</h3>
      <p className="text-gray-600">{desc}</p>
      

    </div>
  );
}

export default Home;
