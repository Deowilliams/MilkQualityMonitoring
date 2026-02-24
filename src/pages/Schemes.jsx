import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import schemes from "../data/schemes";
import milkPrices from "../data/milkPrices";

function Schemes() {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;

  return (
    <div className="min-h-screen bg-[#fefae0]">
      <Navbar />

      <div className="pt-28 px-6 max-w-7xl mx-auto">

        {/* Page Title */}
        <h2 className="text-3xl font-bold text-green-900 text-center mb-12">
          🌾 {t("schemes")}
        </h2>


        {/* ---------------- MILK MARKET PRICE SECTION ---------------- */}
        <div className="bg-white rounded-2xl shadow-md p-10 mb-20">

          <h3 className="text-2xl font-semibold text-green-800 mb-10 text-center">
            🥛 {currentLang === "ta"
              ? "பால் சந்தை விலை"
              : "Milk Market Price"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

            {milkPrices.map((item, index) => (
              <div
                key={index}
                className="bg-green-50 p-8 rounded-xl text-center shadow hover:shadow-lg transition duration-300"
              >
                <h4 className="text-lg font-semibold mb-4 text-gray-700">
                  {currentLang === "ta"
                    ? item.state_ta
                    : item.state}
                </h4>

                <p className="text-4xl font-bold text-green-700 mb-2">
                  ₹{item.price}
                </p>

                <p className="text-gray-600">
                  {item.unit}
                </p>

                <p className="mt-4 text-sm text-gray-500">
                  {currentLang === "ta"
                    ? "மாநில அளவிலான சராசரி விலை"
                    : "State average price"}
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* ---------------- SCHEMES SECTION ---------------- */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-green-800 mb-8 text-center">
            {currentLang === "ta"
              ? "அரசு வேளாண்மை மற்றும் பால் திட்டங்கள்"
              : "Government Agriculture & Dairy Schemes"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {schemes.map((scheme, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition duration-300"
              >
                <h3 className="text-xl font-bold text-green-800 mb-4">
                  {currentLang === "ta"
                    ? scheme.title_ta
                    : scheme.title_en}
                </h3>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  {currentLang === "ta"
                    ? scheme.desc_ta
                    : scheme.desc_en}
                </p>

                <a
                  href={scheme.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800 transition"
                >
                  🔗 {currentLang === "ta"
                    ? "அதிகாரப்பூர்வ இணையதளம்"
                    : "Official Website"}
                </a>
              </div>
            ))}
          </div>
        </div>

        

      </div>

      <Footer />
    </div>
  );
}

export default Schemes;
