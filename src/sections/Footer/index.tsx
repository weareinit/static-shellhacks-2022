import "./index.css";
import React from "react";
import SocialButton from "../../components/SocialButton";
import { SocialType } from "../../util/types";

const Footer: React.FC = () => {
    return (
        <section className="footerBackground">
            <div className="footerText">
                <p>Made with 💛 from Upsilon Pi Epsilon</p>
                <a
                    href="http://mlh.io/code-of-conduct"
                    target="_blank"
                    rel="noreferrer noopoener"
                >
                    MLH Code of Conduct
                </a>
            </div>
            <div className="footerSocial">
                <SocialButton type={SocialType.FACEBOOK} />
                <SocialButton type={SocialType.TWITTER} />
                <SocialButton type={SocialType.INSTAGRAM} />
                <SocialButton type={SocialType.LINKEDIN} />
                <SocialButton type={SocialType.YOUTUBE} />
            </div>
        </section>
    );
};

export default Footer;
