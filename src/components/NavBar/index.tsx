import styles from "./index.module.css";
import React, { useEffect, useState } from "react";
import ShellHacks from "../../../public/static/ShellHacks_Filled.svg";
import ArrowDown from "../../../public/static/ArrowDown.svg";
import ArrowUp from "../../../public/static/ArrowUp.svg";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../../server/firebaseApp";

export enum AccountActionState {
    LOGIN,
    DASHBOARD,
    LOGOUT,
    DISABLED,
}

type NavBarProps = {
    isInLandingPage?: boolean;
    accountAction: AccountActionState;
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

    let accountActionText = "Text";
    let accountAction: () => void = () => {};
    let hideAccountAction = false;

    switch (props.accountAction) {
        case AccountActionState.LOGIN:
            accountActionText = "Login";
            accountAction = () => {
                router.push("/entry?state=login");
            };
            break;
        case AccountActionState.DASHBOARD:
            accountActionText = "Dashboard";
            accountAction = () => {
                router.push("/dashboard");
            };
            break;
        case AccountActionState.LOGOUT:
            accountActionText = "Logout";
            accountAction = () => {
                signOut(auth).then(() => {
                    router.push("/");
                });
            };
            break;
        case AccountActionState.DISABLED:
            hideAccountAction = true;
    }

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
                <div
                    className={`${styles.dropdown} ${
                        hideAccountAction ? styles.accountActionHidden : ""
                    } `}
                >
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
                            className={`${styles.dropdownItem} ${
                                hideAccountAction
                                    ? styles.accountActionHidden
                                    : ""
                            }`}
                            onClick={accountAction}
                        >
                            <p className={styles.dropdownItemText}>
                                {accountActionText}
                            </p>
                        </div>
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
                        className={`${styles.faqPage} ${
                            hideAccountAction ? styles.accountActionHidden : ""
                        }`}
                        onClick={() => {
                            router.push("/#faq");
                        }}
                    >
                        <p className={styles.accountActionText}>FAQ</p>
                    </div>
                    <div
                        className={`${styles.faqPage} ${
                            hideAccountAction ? styles.accountActionHidden : ""
                        }`}
                        onClick={() => {
                            router.push("/#schedule");
                        }}
                    >
                        <p className={styles.accountActionText}>Schedule</p>
                    </div>
                    <div
                        className={`${styles.faqPage} ${
                            hideAccountAction ? styles.accountActionHidden : ""
                        }`}
                        onClick={() => {
                            router.push("/#sponsors");
                        }}
                    >
                        <p className={styles.accountActionText}>Sponsors</p>
                    </div>
                    <div
                        className={`${styles.accountAction} ${
                            hideAccountAction ? styles.accountActionHidden : ""
                        }`}
                        onClick={accountAction}
                    >
                        <p className={styles.accountActionText}>
                            {accountActionText}
                        </p>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
