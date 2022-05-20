import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ApplicationPage from "./pages/ApplicationPage";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/dashboard";

import useAuthListener from "./server/authlistener";
import { useEffect, useState } from "react";

function App() {
  const { isLoggedIn } = useAuthListener();
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/application" element={<ApplicationPage />} />
      <Route path="/signin" element={<SignIn />} />
      {isLoggedIn && <Route path="/dashboard" element={<Dashboard />} />}
      {
        // TODO: Implement/fix 404 errors
      }
    </Routes>
  );
}

export default App;
