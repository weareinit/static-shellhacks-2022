import styles from "./index.module.css";
import React from "react";
import { SocialType } from "../../util/types";
import Facebook from "../../svg/Facebook.svg";
import Twitter from "../../svg/Twitter.svg";
import Instagram from "../../svg/Instagram.svg";
import LinkedIn from "../../svg/LinkedIn.svg";
import YouTube from "../../svg/YouTube.svg";
import Image from "next/image";

type ButtonProps = {
    type: SocialType;
};

const LinkButton: React.FC<ButtonProps> = (props: ButtonProps) => {
    let url, icon;
    switch (props.type) {
        case SocialType.FACEBOOK:
            url = "https://www.facebook.com/upefiu";
            icon = <Facebook />;
            break;
        case SocialType.TWITTER:
            url = "https://twitter.com/upefiu";
            icon = <Twitter />;
            break;
        case SocialType.INSTAGRAM:
            url = "https://www.instagram.com/upefiu";
            icon = <Instagram />;
            break;
        case SocialType.LINKEDIN:
            url = "https://www.linkedin.com/company/upe-fiu";
            icon = <LinkedIn />;
            break;
        case SocialType.YOUTUBE:
            url = "https://www.youtube.com/channel/UC0rBglsAyXsfcE6NFIVGqwA";
            icon = <YouTube />;
            break;
    }

    return (
        <a href={url} className={styles.socialButton}>
            {icon}
        </a>
    );
};

export default LinkButton;
