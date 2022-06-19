import styles from "./index.module.css";
import React from "react";
import CityBackground from "../../components/CityBackground";
import PasswordResetForm from "../../sections/PasswordResetForm";
import { useRouter } from "next/router";
import NavBar, { AccountActionState } from "../../components/NavBar";

const PasswordResetPage: React.FC = () => {
    const router = useRouter();
    return (
        <div className={styles.resetPageBackground}>
            <NavBar accountAction={AccountActionState.LOGIN} />
            <CityBackground />
            <div className={styles.resetBlock}>
                <h2 className={styles.resetTitle}>Reset Password</h2>
                <p className={styles.resetSubtitle}>
                    To go back to the sign up/login page{" "}
                    <span
                        className={styles.resetSubtitleButton}
                        onClick={() => {
                            router.push("/entry");
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
