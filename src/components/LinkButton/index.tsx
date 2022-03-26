import "./index.css";
import React from "react";

type ButtonProps = {
    text: string;
    url: string;
    filled?: boolean;
};

const LinkButton: React.FC<ButtonProps> = (props: ButtonProps) => {
    return (
        <a href={props.url} className="button">
            <div className="buttonBackgroundContainer">
                <div className="defaultGradient" />
                <div className="mediumGradient" />
                <div className="smallGradient" />
            </div>
            <span className={props.filled ? "filled" : "transparent"}>
                {props.text}
            </span>
        </a>
    );
};

export default LinkButton;
