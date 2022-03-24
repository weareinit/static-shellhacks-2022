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
            <span className={props.filled ? "filled" : "transparent"}>
                {props.text}
            </span>
        </a>
    );
};

export default LinkButton;
