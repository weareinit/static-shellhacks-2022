import styles from "./index.module.css";
import React from "react";
import LinkButton from "../../components/LinkButton";
import ShellHacks from "../../../public/static/ShellHacks_Filled.svg";
import Stars from "../../../public/static//Stars.svg";
import CityPNGA from "../../../public/static/CityPNGA.png";
import Footer from "../Footer";
import Image from "next/image";
import Faq from "../faq";
import Schedule from "../schedule";
import Sponsors from "../Sponsors";
import Aboutus from "../aboutus";
import Partners from "../Partners";

const PageHero: React.FC = () => {
    return (
        <section className={styles.pageHeroBackground}>
            <a
                id="mlh-trust-badge"
                className={styles.mlhBanner}
                href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2023-season&utm_content=white"
                target="_blank"
            >
                <img
                    className={styles.mlhImage}
                    src="https://s3.amazonaws.com/logged-assets/trust-badge/2023/mlh-trust-badge-2023-white.svg"
                    alt="Major League Hacking 2023 Hackathon Season"
                />
            </a>
            <div className={styles.pageHeroTop}>
                <Stars className={styles.pageHeroStars} />
                <ShellHacks className={styles.pageHeroLogo} />
                <h2>FLORIDA'S LARGEST HACKATHON</h2>
            </div>
            <div className={styles.pageHeroMiddle}>
                <div className={styles.detailsDiv}>
                    <ul>
                        <li>September 9-11, 2022</li>
                        <li>Florida International University</li>
                        <li>Miami, FL ● In-Person & Virtual!</li>
                    </ul>
                </div>
                <div className={styles.buttonsDiv}>
                    <LinkButton
                        text="Discord"
                        url="https://discord.gg/upefiu"
                    />
                    <LinkButton
                        text="Sponsor Us"
                        url="mailto:Upe@fiu.edu?subject=We want to sponsor"
                    />
                </div>
            </div>
            <Footer />
            <Aboutus />
            <Faq />
            <Schedule />
            <Sponsors />
            <Partners />
            <div className={styles.pageHeroCity}>
                <Image
                    src={CityPNGA}
                    alt="Miami City Skyline"
                    loading="eager"
                    priority
                    style={{ width: '100%', height: 'auto' }}
                />
            </div>
        </section>
    );
};

export default PageHero;
