import "./index.css";
import React from "react";
import { SocialType } from "../../util/types";
import Facebook from "../../svg/Facebook.svg";
import Twitter from "../../svg/Twitter.svg";
import Instagram from "../../svg/Instagram.svg";
import LinkedIn from "../../svg/LinkedIn.svg";
import YouTube from "../../svg/YouTube.svg";

type ButtonProps = {
    type: SocialType;
};

const LinkButton: React.FC<ButtonProps> = (props: ButtonProps) => {
    let url, icon;
    switch (props.type) {
        case SocialType.FACEBOOK:
            url = "https://www.facebook.com/upefiu";
            icon = Facebook;
            break;
        case SocialType.TWITTER:
            url = "https://twitter.com/upefiu";
            icon = Twitter;
            break;
        case SocialType.INSTAGRAM:
            url = "https://www.facebook.com/upefiu";
            icon = Instagram;
            break;
        case SocialType.LINKEDIN:
            url = "https://www.facebook.com/upefiu";
            icon = LinkedIn;
            break;
        case SocialType.YOUTUBE:
            url = "https://www.facebook.com/upefiu";
            icon = YouTube;
            break;
    }

    return (
        <a href={url} className="socialButton">
            <img alt={props.type} src={icon}></img>
        </a>
    );
};

export default LinkButton;
