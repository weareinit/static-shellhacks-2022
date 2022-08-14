import React, { useCallback, useEffect, useState } from "react";
import ChangeAddress from "./formContent";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import SidebarItem from "./sibebarItem";
import Edit from "../../../public/static/Edit.svg";
import Download from "../../../public/static/Download.svg";
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";
import { Hacker } from "../../../util/types";
import { formatError } from "../../util/errors";
import { FirebaseError } from "firebase/app";
import getHacker from "../../server/functions/getHacker";
import { signOut } from "firebase/auth";
import { auth } from "../../server/firebaseApp";
import updateResume from "../../server/functions/updateResume";
import ProgressModal, { ProgressState } from "../../components/ProgressModal";
import NavBar, { AccountActionState } from "../../components/NavBar";
import SEO from "../../components/SEO";
import confirmHacker from "../../server/functions/confirmHacker";

const enum ApplicationStatus {
    NOT_APPLIED,
    APPLIED,
    ACCEPTED,
    CONFIRMED,
}

function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [changingAddress, setChangingAddress] = useState(false);
    const [changingResume, setChangingResume] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [data, setData] = useState<Hacker | null>(null);
    const [applicationStatus, setApplicationStatus] = useState(
        ApplicationStatus.NOT_APPLIED
    );
    const [displayPopup, setDisplayPopup] = useState(false);
    const [popupState, setPopupState] = useState(ProgressState.PROCESSING);
    const [errorMessage, setErrorMessage] = useState("");

    const { firstName, lastName, address, shirtSize, resumePath, resumeName } =
        data || {};
    const { apartment, city, country, postalCode, state, streetAddress } =
        address || {};

    const router = useRouter();
    const user = useAuthUser();

    const logout = async () => {
        //const token = await user.getIdToken();
        // fetch("api/logout", {
        //     headers: [["Authorization", token ?? ""]],
        // })
        //     .then((res) => {
        //         if (res.status === 200) router.push("/");
        //     })
        //     .catch((e) => {
        //         console.log(e);
        //     });
        signOut(auth).then(() => {
            router.push("/");
        });
    };

    useEffect(() => {
        setIsLoading(true);
        setDisplayPopup(true);
        setPopupState(ProgressState.PROCESSING);
        if (user.id != null) {
            getHacker(user.id)
                .then((hacker: Hacker | null) => {
                    if (hacker != undefined) {
                        setApplicationStatus(ApplicationStatus.APPLIED);
                        if (hacker.isAccepted ?? false) {
                            setApplicationStatus(ApplicationStatus.ACCEPTED);
                        }
                        if (hacker.isConfirmed ?? false) {
                            setApplicationStatus(ApplicationStatus.CONFIRMED);
                        }
                        setData(hacker);
                    }
                    setIsLoading(false);
                    setDisplayPopup(false);
                })
                .catch((e: FirebaseError) => {
                    console.log(formatError(e));
                    setErrorMessage(formatError(e));
                    setPopupState(ProgressState.FAILED);
                });
        }
    }, [user]);

    const handleSuccess = useCallback(() => {
        if (user.id != null) {
            getHacker(user.id)
                .then((hacker: Hacker | null) => {
                    if (hacker != undefined) {
                        setApplicationStatus(ApplicationStatus.APPLIED);
                        if (hacker.isAccepted ?? false) {
                            setApplicationStatus(ApplicationStatus.ACCEPTED);
                        }
                        if (hacker.isConfirmed ?? false) {
                            setApplicationStatus(ApplicationStatus.CONFIRMED);
                        }
                        setData(hacker);
                    }
                    setIsLoading(false);
                })
                .catch((e: FirebaseError) => {
                    console.log(formatError(e));
                });
        }
    }, [user, getHacker]);

    let applicationStatusText = "NOT APPLIED";
    switch (applicationStatus) {
        case ApplicationStatus.APPLIED:
            applicationStatusText = "APPLIED";
            break;
        case ApplicationStatus.ACCEPTED:
            applicationStatusText = "ACCEPTED";
            break;
        case ApplicationStatus.CONFIRMED:
            applicationStatusText = "CONFIRMED";
    }

    return (
        <div className={styles.background}>
            <SEO />
            <NavBar accountAction={AccountActionState.LOGOUT} />
            <div>
                {!isLoading && (
                    <div className={styles.dashboardWrapper}>
                        <div className={styles.sidebar}>
                            {/* <ShellHacks_Filled
                                className={styles.logo}
                                onClick={() => {
                                    router.push("/");
                                }}
                            /> */}

                            <SidebarItem title="Application Status:">
                                <p
                                    className={`${styles.sidebarText} ${styles.applicationStatus}`}
                                >
                                    {applicationStatusText}
                                    {applicationStatus ==
                                    ApplicationStatus.ACCEPTED ? (
                                        <button
                                            className={`${styles.smallButtonBackground}
                                                ${styles.confirm}`}
                                            onClick={() => {
                                                if (user.id && data) {
                                                    setDisplayPopup(true);
                                                    setPopupState(
                                                        ProgressState.PROCESSING
                                                    );
                                                    confirmHacker(
                                                        user.id,
                                                        data.email,
                                                        data.firstName,
                                                        data.acceptedAttendance ??
                                                            ""
                                                    )
                                                        .then(() => {
                                                            setDisplayPopup(
                                                                false
                                                            );
                                                            handleSuccess();
                                                        })
                                                        .catch(
                                                            (
                                                                e: FirebaseError
                                                            ) => {
                                                                setDisplayPopup(
                                                                    true
                                                                );
                                                                setPopupState(
                                                                    ProgressState.FAILED
                                                                );
                                                                setErrorMessage(
                                                                    formatError(
                                                                        e
                                                                    )
                                                                );
                                                            }
                                                        );
                                                }
                                            }}
                                        >
                                            <div className={styles.smallButton}>
                                                Confirm
                                            </div>
                                        </button>
                                    ) : null}
                                </p>
                            </SidebarItem>

                            <SidebarItem title="Hacker Guide:">
                                <p className={styles.sidebarText}>
                                    COMING SOON
                                </p>
                            </SidebarItem>

                            {/* <SidebarItem title="Check-In QR Code"></SidebarItem> */}

                            <SidebarItem title="Contact Us:">
                                <div className={styles.linkDiv}>
                                    <p>
                                        •{" "}
                                        <a
                                            className={styles.link}
                                            href="https://discord.gg/upefiu"
                                        >
                                            Discord
                                        </a>
                                    </p>

                                    <p>
                                        •{" "}
                                        <a
                                            className={styles.link}
                                            href="mailto:Upe@fiu.edu?subject=ShellHacks 2022 Participant Inquiry"
                                        >
                                            E-Mail
                                        </a>
                                    </p>
                                </div>
                            </SidebarItem>

                            {/* <div
                                className={`${styles.logoutButtonBackground} ${styles.logout}`}
                            >
                                <button
                                    className={styles.logoutButton}
                                    onClick={logout}
                                >
                                    Log Out
                                </button>
                            </div> */}
                        </div>
                        <div className={styles.applicationView}>
                            <h2>Application Information</h2>
                            {applicationStatus ==
                            ApplicationStatus.NOT_APPLIED ? (
                                <div className={styles.noApplicationDiv}>
                                    <h3 className={styles.noApplicationTitle}>
                                        No Application
                                    </h3>
                                    <p className={styles.noApplicationText}>
                                        Please Complete the Application Before
                                        the Deadline
                                    </p>
                                    <div
                                        className={styles.smallButtonBackground}
                                    >
                                        <button
                                            className={styles.smallButton}
                                            onClick={() => {
                                                router.push("/application");
                                            }}
                                        >
                                            Apply Here
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="information-view">
                                    <div className={styles.applicationField}>
                                        <p>Full Name:</p>
                                        <p
                                            className={
                                                styles.applicationFieldText
                                            }
                                        >
                                            {firstName} {lastName}
                                        </p>
                                    </div>
                                    <div
                                        className={`${styles.applicationField} ${styles.addressField}`}
                                    >
                                        <div className="address-information">
                                            <p>Address:</p>
                                            <p
                                                className={`${styles.applicationFieldText} ${styles.addressFieldText}`}
                                            >
                                                {streetAddress}
                                                {apartment
                                                    ? " " + apartment
                                                    : ""}
                                                , {city}, {state} {country},{" "}
                                                {postalCode}
                                                <button
                                                    className={
                                                        styles.editButton
                                                    }
                                                    onClick={() => {
                                                        setChangingAddress(
                                                            !changingAddress
                                                        );
                                                    }}
                                                >
                                                    <Edit />
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                    <div className={styles.applicationField}>
                                        <p>T-Shirt Size:</p>
                                        <p
                                            className={
                                                styles.applicationFieldText
                                            }
                                        >
                                            {shirtSize}
                                        </p>
                                    </div>
                                    <div className={styles.applicationField}>
                                        <p>Resume:</p>
                                        <p
                                            className={
                                                styles.applicationFieldText
                                            }
                                        >
                                            {resumeName}
                                        </p>
                                        <div className={styles.resumeButtons}>
                                            <a
                                                href={resumePath}
                                                target="_blank"
                                                rel="noreferrer noopener"
                                            >
                                                <Download
                                                    className={
                                                        styles.editButton
                                                    }
                                                />
                                            </a>
                                            <button
                                                className={styles.editButton}
                                                onClick={() => {
                                                    setChangingResume(
                                                        !changingResume
                                                    );
                                                }}
                                            >
                                                <Edit />
                                            </button>
                                        </div>
                                        {changingResume && (
                                            <div
                                                className={styles.resumeSection}
                                            >
                                                <input
                                                    id="file"
                                                    name="file"
                                                    type="file"
                                                    onChange={(
                                                        event: React.ChangeEvent<HTMLInputElement>
                                                    ) => {
                                                        if (
                                                            event.currentTarget
                                                                .files
                                                        ) {
                                                            setFile(
                                                                event
                                                                    .currentTarget
                                                                    .files[0]
                                                            );
                                                        }
                                                    }}
                                                    accept=".pdf"
                                                    className={styles.file}
                                                />
                                                <div
                                                    className={`${styles.smallButtonBackground} ${styles.submit}`}
                                                >
                                                    <button
                                                        className={
                                                            styles.smallButton
                                                        }
                                                        onClick={() => {
                                                            if (
                                                                file != null &&
                                                                user.id != null
                                                            ) {
                                                                setDisplayPopup(
                                                                    true
                                                                );
                                                                setPopupState(
                                                                    ProgressState.PROCESSING
                                                                );
                                                                updateResume(
                                                                    file,
                                                                    user.id
                                                                )
                                                                    .then(
                                                                        () => {
                                                                            setDisplayPopup(
                                                                                false
                                                                            );
                                                                            handleSuccess();
                                                                        }
                                                                    )
                                                                    .catch(
                                                                        (e) => {
                                                                            console.log(
                                                                                e
                                                                            );
                                                                            setDisplayPopup(
                                                                                true
                                                                            );
                                                                            setPopupState(
                                                                                ProgressState.FAILED
                                                                            );
                                                                            setErrorMessage(
                                                                                formatError(
                                                                                    e
                                                                                )
                                                                            );
                                                                        }
                                                                    );
                                                            }
                                                        }}
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                <ChangeAddress
                    trigger={changingAddress}
                    setTrigger={setChangingAddress}
                    handleSuccess={handleSuccess}
                    user={user.firebaseUser}
                />
                <ProgressModal
                    trigger={displayPopup}
                    setTrigger={setDisplayPopup}
                    state={popupState}
                    failedMessage={errorMessage}
                    processingMessage={"Loading..."}
                />
            </div>
        </div>
    );
}

export default withAuthUser({
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Dashboard);
