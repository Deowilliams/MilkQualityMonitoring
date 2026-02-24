import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-green-800 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold tracking-wide">
          🥛 Milk Quality Monitoring
        </h1>

        <nav className="flex items-center space-x-6 text-lg">
          <Link to="/dashboard" className="hover:text-yellow-300">
            {t("dashboard")}
          </Link>
          <Link to="/schemes" className="hover:text-yellow-300">
            {t("schemes")}
          </Link>
          <Link to="/alerts" className="hover:text-yellow-300">
            {t("alerts")}
          </Link>
          <Link to="/weather" className="hover:text-yellow-300">
            {i18n.language === "ta" ? "வானிலை" : "Weather"}
          </Link>

          <div className="border-l pl-4 space-x-3">
            <button onClick={() => changeLang("en")} className="hover:text-yellow-300">EN</button>
            <button onClick={() => changeLang("ta")} className="hover:text-yellow-300">தமிழ்</button>
          </div>

          <button
            onClick={() => navigate("/")}
            className="bg-red-500 px-4 py-1 rounded-lg hover:bg-red-600"
          >
            {t("logout")}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
