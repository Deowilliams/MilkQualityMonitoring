import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LanguageSelector from "./pages/LanguageSelector";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Schemes from "./pages/Schemes";
import Alerts from "./pages/Alerts";
import Weather from "./pages/Weather";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LanguageSelector />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/schemes" element={<Schemes />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </Router>
  );
}

export default App;
