import React from "react";
import styles from "./index.module.css";
import HackerForm from "../../sections/HackerForm";
import CityBackground from "../../components/CityBackground";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import NavBar, { AccountActionState } from "../../components/NavBar";

const ApplicationPage: React.FC = () => {
    return (
        <div className={styles.applicationPage}>
            <NavBar accountAction={AccountActionState.DASHBOARD} />
            <CityBackground />
            <div className={styles.formWrapper}>
                <HackerForm />
            </div>
        </div>
    );
};

export default withAuthUser({
    // whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(ApplicationPage);
