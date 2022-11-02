import styles from "./index.module.css";
import React, { useEffect } from "react";
import CityBackground from "../../components/CityBackground";
import LoginForm from "../../sections/LoginForm";
import SignUpForm from "../../sections/SignUpForm";
import ForgotPasswordForm from "../../sections/ForgotPasswordForm";
import NavBar, { AccountActionState } from "../../components/NavBar";
import { useRouter } from "next/router";
import SEO from "../../components/SEO";

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

    const router = useRouter();
    const { state } = router.query;

    useEffect(() => {
        if (state) {
            if (state === "login") setEntryState(EntryState.LOGIN);
            if (state === "signup") setEntryState(EntryState.SIGNUP);
            if (state === "forgot_password")
                setEntryState(EntryState.PASSWORD_RESET);
        }
    }, [state]);

    title = "Registrations are closed.";
    subtitle = "Thank you for attending. See you next year!";

    return (
        <div className={styles.entryPage}>
            <SEO />
            <NavBar accountAction={AccountActionState.DISABLED} />
            <div className={styles.entryPageBackground}>
                <CityBackground />
                <div className={styles.entryBlock}>
                    <h2 className={styles.entryTitle}>{title}</h2>
                    <h3 className={styles.entrySubtitle}>{subtitle}</h3>
                </div>
            </div>
        </div>
    );
};

export default EntryPage;
