import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { auth, db } from "../../server/firebaseApp";
import ChangeAddress from "./formContent";
import Resume from "./resume";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import SidebarItem from "./sibebarItem";
import ShellHacks_Filled from "../../svg/ShellHacks_Filled.svg";
import Stars from "../../svg/Stars.svg";
import Edit from "../../svg/Edit.svg";
import { useAuthUser, withAuthUser } from "next-firebase-auth";

//
async function handleAddressChange(newAddress: {}) {}

async function handleResumeChange(file: any) {}

function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState<DocumentData | undefined>();
    const [changingAddress, setChangingAddress] = useState(false);
    const [hasDocument, setHasDocument] = useState(false); // This is to check if the user has a document in the firestore.
    const [render, setRender] = useState(false);

    const { firstName, lastName, address, shirtSize } = userData || {};
    const { apartment, city, country, postalCode, state, streetAddress } =
        address || {};

    const router = useRouter();
    const user = useAuthUser();

    useEffect(() => {
        if (render) {
            const docRef = doc(db, "hackers", "" + user?.uid);

            // Defining the fetch data function.
            const fetchData = async () => {
                await getDoc(docRef)
                    .then((rawData) => {
                        const data: DocumentData | undefined = rawData.data();
                        setUserData(data);
                        console.log("Component Did Fetch");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            };

            // checking if the document exists in the collection. If it does, then it calls teh fetch data function.
            const checkIfDocExists = async () => {
                await getDoc(docRef).then((doc) => {
                    if (doc.exists()) {
                        fetchData(); // if fetch data succeeds, then the data has successfully been fetched.
                        setIsLoading(false);
                        setHasDocument(true);
                    } else {
                        setHasDocument(false);
                    }
                });
            };

            checkIfDocExists();
        }

        if (!render) {
            setRender(true);
        }
    }, [user]);

    return (
        <div>
            {!isLoading && (
                <div className={styles.background}>
                    <div className={styles.dashboardWrapper}>
                        <div className={styles.sidebar}>
                            <ShellHacks_Filled
                                className={styles.logo}
                                onClick={() => {
                                    router.push("/");
                                }}
                            />

                            <SidebarItem title="Application Status">
                                <p
                                    className={`${styles.sidebarText} ${styles.applicationStatus}`}
                                >
                                    APPLIED!
                                    {
                                        // Applied if document exists in firebase
                                    }
                                </p>
                            </SidebarItem>

                            <SidebarItem title="Hacker Guide">
                                <p className={styles.sidebarText}>
                                    COMING SOON
                                </p>
                            </SidebarItem>

                            {/* <SidebarItem title="Check-In QR Code"></SidebarItem> */}

                            <SidebarItem title="Contact Us">
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

                            <div
                                className={`${styles.logoutButtonBackground} ${styles.logout}`}
                            >
                                <button
                                    className={styles.logoutButton}
                                    onClick={async () => {
                                        await auth.signOut();
                                        router.push("/");
                                    }}
                                >
                                    Log Out
                                </button>
                            </div>
                        </div>
                        <div className={styles.applicationView}>
                            <h2>Application Information</h2>
                            <div className="information-view">
                                <div className={styles.applicationField}>
                                    <p>Full Name:</p>
                                    <p className={styles.applicationFieldText}>
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
                                            {streetAddress} {apartment}{" "}
                                            {postalCode} {city}, {state}{" "}
                                            {country}
                                            <button
                                                className={styles.editButton}
                                                onClick={() => {
                                                    setChangingAddress(
                                                        !changingAddress
                                                    );
                                                    console.log(
                                                        "Changing Address"
                                                    );
                                                    console.log(
                                                        changingAddress
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
                                    <p className={styles.applicationFieldText}>
                                        {shirtSize}
                                    </p>
                                </div>
                                {
                                    // <Resume></Resume>
                                }
                            </div>
                        </div>
                        <ChangeAddress
                            trigger={changingAddress}
                            setTrigger={setChangingAddress}
                        />
                    </div>
                </div>
            )}
            {isLoading && (
                <div>
                    <h1>Oops unexpected error! Please refresh page!</h1>
                </div>
            )}
        </div>
    );
}

export default withAuthUser()(Dashboard);

/* 

*/
