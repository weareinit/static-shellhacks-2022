import "./index.module.css";
import React from "react";
import PageHero from "../../sections/PageHero";
import Footer from "../../sections/Footer";
import NavBar from "../../components/NavBar";
import SEO from "../../components/SEO";

const LandingPage: React.FC = () => {
    return (
        <div>
            <SEO />
            <NavBar isInLandingPage={true} />
            <PageHero />
        </div>
    );
};

export default LandingPage;
