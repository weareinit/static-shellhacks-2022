import styles from "./index.module.css";
import React, { createRef, FormEvent } from "react";
import ProgressModal, { ProgressState } from "../../components/ProgressModal";
import { FirebaseError } from "firebase/app";
import { formatError } from "../../util/errors";
import { useRouter } from "next/router";
import createUser from "../../server/functions/createUser";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

const SignUpForm: React.FC = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [errorOccured, setErrorOccured] = React.useState(false);
    const [displayPopup, setDisplayPopup] = React.useState(false);
    const [disableSubmit, setDisableSubmit] = React.useState(true);

    const router = useRouter();
    const recaptchaRef = createRef();

    const signUp = async (event: any) => {
        event.preventDefault();
        // @ts-ignore
        const recaptchaValue = recaptchaRef.current.getValue();
        if (recaptchaValue === "") return;

        await axios
            .post("/api/verifyRecaptcha", { token: recaptchaValue })
            .then((res) => {
                if (res.status != 200) {
                    setErrorOccured(true);
                    return;
                }
            })
            .catch((error) => {
                setErrorOccured(true);
                return;
            });

        setErrorOccured(false);
        setDisplayPopup(true);
        await createUser(email, password)
            .then(() => {
                router.push("/application");
            })
            .catch((e: FirebaseError) => {
                setErrorOccured(true);
                setError(formatError(e));
            });
    };

    return (
        <form
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
                signUp(e);
            }}
        >
            <ProgressModal
                trigger={displayPopup}
                setTrigger={setDisplayPopup}
                state={
                    errorOccured
                        ? ProgressState.FAILED
                        : ProgressState.PROCESSING
                }
                failedMessage={error.length != 0 ? error : undefined}
            />
            <div className={styles.signUpField}>
                <label htmlFor="email" id="email-label">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />
            </div>
            <div className={styles.signUpField}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
            </div>
            <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={() => {
                    if (disableSubmit) setDisableSubmit(false);
                }}
                className={styles.recaptcha}
            />
            <div className={styles.buttonDiv}>
                <div
                    className={`${styles.submitButtonBackground} ${
                        disableSubmit
                            ? styles.submitButtonDisabledBackground
                            : ""
                    }`}
                >
                    <input
                        className={`${styles.submitButton} ${
                            disableSubmit ? styles.submitButtonDisabled : ""
                        }`}
                        type="submit"
                        value="Sign Up"
                        id="signup"
                        disabled={disableSubmit}
                    />
                </div>
            </div>
        </form>
    );
};

export default SignUpForm;
