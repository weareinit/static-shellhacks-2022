import styles from "./index.module.css";
import React, { createRef, FormEvent } from "react";
import { auth } from "../../server/firebaseApp";
import { sendPasswordResetEmail } from "firebase/auth";
import ProgressModal, { ProgressState } from "../../components/ProgressModal";
import { FirebaseError } from "firebase/app";
import { formatError } from "../../util/errors";
import ReCAPTCHA from "react-google-recaptcha";

const ForgotPasswordForm: React.FC = () => {
    const [email, setEmail] = React.useState("");
    const [error, setError] = React.useState("");
    const [displayPopup, setDisplayPopup] = React.useState(false);
    const [popupState, setPopupState] = React.useState(
        ProgressState.PROCESSING
    );
    const [disableSubmit, setDisableSubmit] = React.useState(true);

    const recaptchaRef = createRef();

    const forgotPassword = async (event: any) => {
        event.preventDefault();
        // @ts-ignore
        const recaptchaValue = recaptchaRef.current.getValue();
        if (recaptchaValue === "") return;
        setPopupState(ProgressState.PROCESSING);
        setDisplayPopup(true);
        await sendPasswordResetEmail(auth, email)
            .then(() => {
                setPopupState(ProgressState.COMPLETE);
            })
            .catch((e: FirebaseError) => {
                console.log(e.code);
                setPopupState(ProgressState.FAILED);
                setError(formatError(e));
            });
    };

    return (
        <form
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
                forgotPassword(e);
            }}
        >
            <ProgressModal
                trigger={displayPopup}
                setTrigger={setDisplayPopup}
                state={popupState}
                failedMessage={error.length != 0 ? error : undefined}
                completeMessage="Password reset sent to email."
            />
            <div className={styles.forgotPasswordField}>
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
            <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6Lf0HqsgAAAAAExp_b89HLfv4LnHw18W0riS5enQ"
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
                        value="Send Password Reset"
                        id="signin"
                        disabled={disableSubmit}
                    />
                </div>
            </div>
        </form>
    );
};

export default ForgotPasswordForm;
