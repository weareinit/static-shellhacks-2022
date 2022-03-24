import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ApplicationPage from "./pages/ApplicationPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/application" element={<ApplicationPage />} />
        </Routes>
    );
}

export default App;
