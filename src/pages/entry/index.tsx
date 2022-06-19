import styles from "./index.module.css";
import React from "react";
import CityBackground from "../../components/CityBackground";
import LoginForm from "../../sections/LoginForm";
import SignUpForm from "../../sections/SignUpForm";
import ForgotPasswordForm from "../../sections/ForgotPasswordForm";
import NavBar, { AccountActionState } from "../../components/NavBar";

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
                    <p className={styles.entrySubtitle}>
                        Don't have an account?{" "}
                        <span
                            className={styles.entrySubtitleButton}
                            onClick={() => {
                                setEntryState(EntryState.SIGNUP);
                            }}
                        >
                            Sign up here!
                        </span>
                    </p>
                    <p className={styles.entrySubtitle}>
                        Forgot Password?{" "}
                        <span
                            className={styles.entrySubtitleButton}
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
                <p className={styles.entrySubtitle}>
                    Already have an account?{" "}
                    <span
                        className={styles.entrySubtitleButton}
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
                <p className={styles.entrySubtitle}>
                    <span
                        className={styles.entrySubtitleButton}
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
                <p className={styles.entrySubtitle}>
                    Already have an account?{" "}
                    <span
                        className={styles.entrySubtitleButton}
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
        <div className={styles.entryPage}>
            <NavBar accountAction={AccountActionState.DISABLED} />
            <div className={styles.entryPageBackground}>
                <CityBackground />
                <div className={styles.entryBlock}>
                    <h2 className={styles.entryTitle}>{title}</h2>
                    {subtitle}
                    {body}
                </div>
            </div>
        </div>
    );
};

export default EntryPage;
