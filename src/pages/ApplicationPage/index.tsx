import React from "react";
import "./index.css";
import HackerForm from "../../sections/HackerForm";
import ShellHacks from "../../svg/ShellHacks_Filled.svg";
import City from "../../svg/CityNoShell.svg";

const ApplicationPage: React.FC = () => {
    return (
        <div className="applicationPage">
            <div className="applicationPageBackground">
                <img
                    alt="City Background"
                    className="applicationPageCity"
                    src={City}
                />
            </div>
            <div className="formWrapper">
                <img
                    alt="ShellHacks Logo"
                    className="applicationLogo"
                    src={ShellHacks}
                />
                <HackerForm />
            </div>
        </div>
    );
};

export default ApplicationPage;
