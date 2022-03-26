import "./index.css";
import React from "react";
import LinkButton from "../../components/LinkButton";

const PageHero: React.FC = () => {
    return (
        <section className="pageHeroBackground">
            <div className="pageHeroMiddle">
                <div className="detailsDiv">
                    <ul>
                        <li>September 23-25, 2022</li>
                        <li>Florida International University</li>
                        <li>Miami, FL ● In-Person & Virtual!</li>
                    </ul>
                </div>
                <div className="buttonsDiv">
                    <LinkButton text="Register Now!" url="" filled={true} />
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
        </section>
    );
};

export default PageHero;
