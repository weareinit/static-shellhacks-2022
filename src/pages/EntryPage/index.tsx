import "./index.css";
import React from "react";
import CityBackground from "../../components/CityBackground";
import LoginForm from "../../sections/LoginForm";
import SignUpForm from "../../sections/SignUpForm";
import ForgotPasswordForm from "../../sections/ForgotPasswordForm";

enum EntryState {
    LOGIN,
    SIGNUP,
    PASSWORD_RESET,
}

const EntryPage: React.FC = () => {
    const [entryState, setEntryState] = React.useState(EntryState.SIGNUP);
    let title;
    let subtitle;
    let body;

    switch (entryState) {
        case EntryState.LOGIN:
            title = "Welcome Back!";
            subtitle = (
                <div>
                    <p className="entrySubtitle">
                        Don't have an account?{" "}
                        <span
                            className="entrySubtitleButton"
                            onClick={() => {
                                setEntryState(EntryState.SIGNUP);
                            }}
                        >
                            Sign up here!
                        </span>
                    </p>
                    <p className="entrySubtitle">
                        Forgot Password?{" "}
                        <span
                            className="entrySubtitleButton"
                            onClick={() => {
                                setEntryState(EntryState.PASSWORD_RESET);
                            }}
                        >
                            Click here!
                        </span>
                    </p>
                </div>
            );
            body = <LoginForm />;
            break;
        case EntryState.SIGNUP:
            title = "Sign Up!";
            subtitle = (
                <p className="entrySubtitle">
                    Already have an account?{" "}
                    <span
                        className="entrySubtitleButton"
                        onClick={() => {
                            setEntryState(EntryState.LOGIN);
                        }}
                    >
                        Login here!
                    </span>
                </p>
            );
            body = <SignUpForm />;
            break;
        case EntryState.PASSWORD_RESET:
            title = "Reset Password";
            subtitle = (
                <p className="entrySubtitle">
                    <span
                        className="entrySubtitleButton"
                        onClick={() => {
                            setEntryState(EntryState.LOGIN);
                        }}
                    >
                        Login here!
                    </span>
                </p>
            );
            body = <ForgotPasswordForm />;
            break;
        default:
            title = "Sign Up!";
            subtitle = (
                <p className="entrySubtitle">
                    Already have an account?{" "}
                    <span
                        className="entrySubtitleButton"
                        onClick={() => {
                            setEntryState(EntryState.LOGIN);
                        }}
                    >
                        Login here!
                    </span>
                </p>
            );
            body = <SignUpForm />;
            break;
    }

    return (
        <div className="entryPageBackground">
            <CityBackground />
            <div className="entryBlock">
                <h2 className="entryTitle">{title}</h2>
                {subtitle}
                {body}
            </div>
        </div>
    );
};

export default EntryPage;
