import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function LanguageSelector() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const selectLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-800 text-white">

      <h1 className="text-4xl font-bold mb-12 text-center">
        🌾 Milk Quality Monitoring System
      </h1>

      <div className="flex space-x-8">

        <button
          onClick={() => selectLang("en")}
          className="bg-yellow-400 text-black px-10 py-4 rounded-xl text-xl font-semibold hover:bg-yellow-500 transition"
        >
          English
        </button>

        <button
          onClick={() => selectLang("ta")}
          className="bg-white text-green-800 px-10 py-4 rounded-xl text-xl font-semibold hover:bg-gray-200 transition"
        >
          தமிழ்
        </button>

      </div>

    </div>
  );
}

export default LanguageSelector;
