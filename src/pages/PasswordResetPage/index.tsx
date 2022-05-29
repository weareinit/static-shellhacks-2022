import "./index.css";
import React from "react";
import CityBackground from "../../components/CityBackground";
import PasswordResetForm from "../../sections/PasswordResetForm";
import { useNavigate } from "react-router-dom";

const PasswordResetPage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="resetPageBackground">
            <CityBackground />
            <div className="resetBlock">
                <h2 className="resetTitle">Reset Password</h2>
                <p className="resetSubtitle">
                    To go back to the sign up/login page{" "}
                    <span
                        className="resetSubtitleButton"
                        onClick={() => {
                            navigate("/entry");
                        }}
                    >
                        click here.
                    </span>
                </p>
                <PasswordResetForm />
            </div>
        </div>
    );
};

export default PasswordResetPage;
