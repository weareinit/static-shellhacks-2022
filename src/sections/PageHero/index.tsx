import styles from "./index.module.css";
import React from "react";
import { Emoji, EmojiProvider } from "react-apple-emojis";
import emojiData from "react-apple-emojis/lib/data.json";
import LinkButton from "../../components/LinkButton";
import ShellHacks from "../../svg/ShellHacks_Filled.svg";
import Stars from "../../svg/Stars.svg";
import CityPNG from "../../svg/CityPNGA.png";
import Footer from "../Footer";
import Image from "next/image";

const PageHero: React.FC = () => {
    return (
        <section className={styles.pageHeroBackground}>
            <div className={styles.pageHeroTop}>
                <Stars className={styles.pageHeroStars} />
                <ShellHacks className={styles.pageHeroLogo} />
                <h2>FLORIDA'S LARGEST HACKATHON</h2>
            </div>
            <div className={styles.pageHeroMiddle}>
                <div className={styles.detailsDiv}>
                    {/* prettier-ignore */}
                    <EmojiProvider data={emojiData}>
                        <ul>
                            <li><Emoji className={styles.detailsMarker} name="rocket"/>September 16-18, 2022</li>
                            <li><Emoji className={styles.detailsMarker} name="rocket"/>Florida International University</li>
                            <li><Emoji className={styles.detailsMarker} name="rocket"/>Miami, FL ● In-Person & Virtual!</li>
                        </ul>
                    </EmojiProvider>
                </div>
                <div className={styles.buttonsDiv}>
                    <LinkButton text="Sign Up!" url="/entry" filled={true} />
                    <div className={styles.buttonsRow}>
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
            </div>
            <Footer />
            <div className={styles.pageHeroCity}>
                {/* <Image alt="Plane" className="pageHeroPlane" src={Plane} />
                <div id="spotlight1" className="pageHeroSpotlight" />
                <div id="spotlight2" className="pageHeroSpotlight" /> */}
                <Image
                    src={CityPNG}
                    loading="eager"
                    layout="responsive"
                    priority
                />
            </div>
        </section>
    );
};

export default PageHero;
