import React from "react";
import styles from "./index.module.css";
import HackerForm from "../../sections/HackerForm";
import CityBackground from "../../components/CityBackground";

const ApplicationPage: React.FC = () => {
    return (
        <div className={styles.applicationPage}>
            <CityBackground />
            <div className={styles.formWrapper}>
                <HackerForm />
            </div>
        </div>
    );
};

export default ApplicationPage;
