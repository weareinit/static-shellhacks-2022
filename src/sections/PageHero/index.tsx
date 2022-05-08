import "./index.css";
import React from "react";
import { Emoji, EmojiProvider } from "react-apple-emojis";
import emojiData from "react-apple-emojis/lib/data.json";
import LinkButton from "../../components/LinkButton";
import ShellHacks from "../../svg/ShellHacks_Filled.svg";
import City from "../../svg/CityV5.svg";
import Stars from "../../svg/Stars.svg";
import Plane from "../../svg/PlaneV2.svg";
import Footer from "../Footer";

const PageHero: React.FC = () => {
    return (
        <section className="pageHeroBackground">
            <div className="pageHeroTop">
                <img alt="Stars" className="pageHeroStars" src={Stars} />
                <img
                    alt="ShellHacks Logo"
                    className="pageHeroLogo"
                    src={ShellHacks}
                />
                <h2>FLORIDA'S LARGEST HACKATHON</h2>
            </div>
            <div className="pageHeroMiddle">
                <div className="detailsDiv">
                    {/* prettier-ignore */}
                    <EmojiProvider data={emojiData}>
                        <ul>
                            <li><Emoji className="detailsMarker" name="rocket"/>September 23-25, 2022</li>
                            <li><Emoji className="detailsMarker" name="rocket"/>Florida International University</li>
                            <li><Emoji className="detailsMarker" name="rocket"/>Miami, FL ● In-Person & Virtual!</li>
                        </ul>
                    </EmojiProvider>
                </div>
                <div className="buttonsDiv">
                    <LinkButton
                        text="Register Now!"
                        url="/application"
                        filled={true}
                    />
                    <div className="buttonsRow">
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
            <div className="pageHeroCity">
                {/* <img alt="Plane" className="pageHeroPlane" src={Plane} />
                <div id="spotlight1" className="pageHeroSpotlight" />
                <div id="spotlight2" className="pageHeroSpotlight" /> */}
                <img
                    alt="City Background"
                    className="pageHeroCityImage"
                    src={City}
                />
            </div>
        </section>
    );
};

export default PageHero;
