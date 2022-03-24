import "./index.css";
import React from "react";
import LinkButton from "../../components/LinkButton";

const PageHero: React.FC = () => {
    return (
        <section className="background">
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
        </section>
    );
};

export default PageHero;
