import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">{t("login")}</h2>

        <input
          type="text"
          placeholder={t("username")}
          className="w-full p-2 mb-4 border rounded"
        />

        <input
          type="password"
          placeholder={t("password")}
          className="w-full p-2 mb-4 border rounded"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          {t("login")}
        </button>
      </div>
      

    </div>
    
  );
}

export default Login;
