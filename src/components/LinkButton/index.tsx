import "./index.css";
import React from "react";

type ButtonProps = {
    text: string;
    url: string;
    filled?: boolean;
};

const LinkButton: React.FC<ButtonProps> = (props: ButtonProps) => {
    return (
        <a href={props.url} className="linkButton">
            <div
                className={
                    props.filled
                        ? "buttonFilledBackground"
                        : "buttonOutlinedBackground"
                }
            />
            <span className={props.filled ? "filled" : "transparent"}>
                {props.text}
            </span>
        </a>
    );
};

export default LinkButton;
