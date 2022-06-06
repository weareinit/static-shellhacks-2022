import React from "react";
import styles from "./index.module.css";
import HackerForm from "../../sections/HackerForm";
import ShellHacks from "../../svg/ShellHacks_Filled.svg";
import City from "../../svg/CityNoShell.svg";
import CityPNG from "../../svg/CityPNGA.png";
import Image from "next/image";

const ApplicationPage: React.FC = () => {
    return (
        <div className={styles.applicationPage}>
            <div className={styles.applicationPageBackground}>
                <Image
                    src={CityPNG}
                    loading="eager"
                    layout="responsive"
                    className={styles.city}
                />
            </div>
            <div className={styles.formWrapper}>
                <HackerForm />
            </div>
        </div>
    );
};

export default ApplicationPage;
