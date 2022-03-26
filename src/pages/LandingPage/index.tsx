import "./index.css";
import React from "react";
import PageHero from "../../sections/PageHero";
import Footer from "../../sections/Footer";

const LandingPage: React.FC = () => {
    return (
        <div>
            <PageHero />
            <Footer />
        </div>
    );
};

export default LandingPage;
