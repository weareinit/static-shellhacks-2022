import styles from "./index.module.css";
import React from "react";
import SocialButton from "../../components/SocialButton";
import { SocialType } from "../../util/types";
import YellowHeart from "../../../public/static/yellow_heart_color.svg";
import Image from "next/image";

const Footer: React.FC = () => {
    return (
        <section className={styles.footerBackground}>
            <div className={styles.footerText}>
                {/* prettier-ignore */}
                <p>
                    Made with <YellowHeart className={styles.yellowHeart}/> from Upsilon&nbsp;Pi&nbsp;Epsilon
                </p>
                <a
                    href="http://mlh.io/code-of-conduct"
                    target="_blank"
                    rel="noreferrer noopoener"
                >
                    MLH Code of Conduct
                </a>
            </div>
            <div className={styles.footerSocial}>
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
