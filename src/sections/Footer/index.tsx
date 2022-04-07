import "./index.css";
import React from "react";
import { Emoji, EmojiProvider } from "react-apple-emojis";
import emojiData from "react-apple-emojis/lib/data.json";
import SocialButton from "../../components/SocialButton";
import { SocialType } from "../../util/types";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <section className="footerBackground">
      <div className="footerText">
        {/* prettier-ignore */}
        <p>
                    Made with <EmojiProvider data={emojiData}><Emoji className="yellowHeart" name="yellow-heart"/></EmojiProvider> from Upsilon Pi Epsilon
                </p>
        <a href="http://mlh.io/code-of-conduct" target="_blank" rel="noreferrer noopoener">
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
