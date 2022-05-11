import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ApplicationPage from "./pages/ApplicationPage";
import SignIn from "./pages/SignIn";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/application" element={<ApplicationPage />} />
            <Route path="/signin" element={<SignIn />} />
        </Routes>
    );
}

export default App;
