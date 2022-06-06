import styles from "./index.module.css";
import React from "react";
import { Emoji, EmojiProvider } from "react-apple-emojis";
import emojiData from "react-apple-emojis/lib/data.json";
import SocialButton from "../../components/SocialButton";
import { SocialType } from "../../util/types";

const Footer: React.FC = () => {
    return (
        <section className={styles.footerBackground}>
            <div className={styles.footerText}>
                {/* prettier-ignore */}
                <p>
                    Made with <EmojiProvider data={emojiData}><Emoji className={styles.yellowHeart} name="yellow-heart"/></EmojiProvider> from Upsilon&nbsp;Pi&nbsp;Epsilon
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
