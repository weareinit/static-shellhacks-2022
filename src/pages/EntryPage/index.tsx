import "./index.css";
import React from "react";
import CityBackground from "../../components/CityBackground";
import LoginForm from "../../sections/LoginForm";
import SignUpForm from "../../sections/SignUpForm";

const EntryPage: React.FC = () => {
    const [isLoggingIn, setIsLoggingIn] = React.useState(false);
    const title = isLoggingIn ? "Welcome Back!" : "Sign Up!";
    const onClick = () => {
        setIsLoggingIn(!isLoggingIn);
    };
    const loginSubtitle = isLoggingIn ? (
        <p className="entrySubtitle">
            Don't have an account?{" "}
            <span className="entrySubtitleButton" onClick={onClick}>
                Sign up here!
            </span>
        </p>
    ) : (
        <p className="entrySubtitle">
            Already have an account?{" "}
            <span className="entrySubtitleButton" onClick={onClick}>
                Login here!
            </span>
        </p>
    );

    return (
        <div className="entryPageBackground">
            <CityBackground />
            <div className="entryBlock">
                <h2 className="entryTitle">{title}</h2>
                {loginSubtitle}
                {isLoggingIn ? <LoginForm /> : <SignUpForm />}
            </div>
        </div>
    );
};

export default EntryPage;
