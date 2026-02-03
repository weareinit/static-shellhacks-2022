import styles from "./index.module.css";
import React, { useEffect, useState } from "react";
import ShellHacks from "../../../public/static/ShellHacks_Filled.svg";
import ArrowDown from "../../../public/static/ArrowDown.svg";
import ArrowUp from "../../../public/static/ArrowUp.svg";
import { useRouter } from "next/router";

type NavBarProps = {
    isInLandingPage?: boolean;
};

const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {
    const { isInLandingPage } = props;
    const [isAtTop, setIsAtTop] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);

    const router = useRouter();

    const handleScroll = () => {
        if (window.scrollY > 100) setIsAtTop(false);
        else setIsAtTop(true);
    };

    const handleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const showLogo = isInLandingPage ? !isAtTop : true;

    return (
        <div className={styles.navBarWrapper}>
            <nav
                className={`${styles.navBar} ${styles.navBarFlex} ${styles.navBarFixed}`}
            >
                <ShellHacks
                    className={styles.logo}
                    onClick={() => {
                        router.push("/");
                    }}
                />
                {/** MOBILE NAVBAR DROPDOWN */}
                <div className={styles.dropdown}>
                    {showDropdown ? (
                        <ArrowUp
                            className={styles.dropdownButton}
                            onClick={handleDropdown}
                        />
                    ) : (
                        <ArrowDown
                            className={styles.dropdownButton}
                            onClick={handleDropdown}
                        />
                    )}

                    <div
                        className={`${styles.dropdownContent} ${
                            !showDropdown ? styles.dropdownContentHidden : ""
                        }`}
                    >
                        <div
                            className={styles.dropdownItem}
                            onClick={() => {
                                router.push("/#faq");
                                handleDropdown();
                            }}
                        >
                            <p className={styles.dropdownItemText}>FAQ</p>
                        </div>
                        <div
                            className={styles.dropdownItem}
                            onClick={() => {
                                router.push("/#schedule");
                                handleDropdown();
                            }}
                        >
                            <p className={styles.dropdownItemText}>Schedule</p>
                        </div>
                        <div
                            className={styles.dropdownItem}
                            onClick={() => {
                                router.push("/#sponsors");
                                handleDropdown();
                            }}
                        >
                            <p className={styles.dropdownItemText}>Sponsors</p>
                        </div>
                    </div>
                </div>
                {/** DESKTOP NAVBAR INLINE */}
                <div className={styles.inline}>
                    <div
                        className={styles.faqPage}
                        onClick={() => {
                            router.push("/#faq");
                        }}
                    >
                        <p className={styles.accountActionText}>FAQ</p>
                    </div>
                    <div
                        className={styles.faqPage}
                        onClick={() => {
                            router.push("/#schedule");
                        }}
                    >
                        <p className={styles.accountActionText}>Schedule</p>
                    </div>
                    <div
                        className={styles.faqPage}
                        onClick={() => {
                            router.push("/#sponsors");
                        }}
                    >
                        <p className={styles.accountActionText}>Sponsors</p>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
