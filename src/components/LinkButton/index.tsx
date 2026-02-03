import styles from "./index.module.css";
import React from "react";
import Link from "next/link";

type ButtonProps = {
    text: string;
    url: string;
    filled?: boolean;
};

const LinkButton: React.FC<ButtonProps> = (props: ButtonProps) => {
    return (
        <Link href={props.url} style={{ textDecoration: 'none' }}>
            <div className={styles.linkButton}>
                <div
                    className={
                        props.filled
                            ? styles.buttonFilledBackground
                            : styles.buttonOutlinedBackground
                    }
                />
                <span
                    className={
                        props.filled ? styles.filled : styles.transparent
                    }
                >
                    {props.text}
                </span>
            </div>
        </Link>
    );
};

export default LinkButton;
