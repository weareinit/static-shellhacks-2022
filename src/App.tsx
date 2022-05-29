import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ApplicationPage from "./pages/ApplicationPage";
import EntryPage from "./pages/EntryPage";
import Dashboard from "./pages/dashboard";

import useAuthListener from "./server/authlistener";
import PasswordResetPage from "./pages/PasswordResetPage";

const NotFound = () => {
    return (
        <>
            <h1>FUCKING MONKEY</h1>
        </>
    );
};
function App() {
    const { isLoggedIn } = useAuthListener();
    return (
        <Routes>
            <Route path="*" element={<NotFound />} />

            <Route path="/" element={<LandingPage />} />
            <Route path="/application" element={<ApplicationPage />} />
            <Route
                path="/entry"
                element={
                    isLoggedIn ? <Navigate to="/dashboard" /> : <EntryPage />
                }
            />
            <Route path="/password-reset" element={<PasswordResetPage />} />

            {isLoggedIn && <Route path="/dashboard" element={<Dashboard />} />}
            {
                // TODO: Implement/fix 404 errors
            }
        </Routes>
    );
}

export default App;
