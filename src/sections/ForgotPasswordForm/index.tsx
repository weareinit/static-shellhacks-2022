import styles from "./index.module.css";
import React from "react";
import { auth } from "../../server/firebaseApp";
import { sendPasswordResetEmail } from "firebase/auth";
import ProgressModal, { ProgressState } from "../../components/ProgressModal";
import { FirebaseError } from "firebase/app";
import { formatError } from "../../util/errors";

const ForgotPasswordForm: React.FC = () => {
    const [email, setEmail] = React.useState("");
    const [error, setError] = React.useState("");
    const [displayPopup, setDisplayPopup] = React.useState(false);
    const [popupState, setPopupState] = React.useState(
        ProgressState.PROCESSING
    );

    const forgotPassword = async (event: any) => {
        event.preventDefault();
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
        <form>
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
            <div className={styles.buttonDiv}>
                <div className={styles.submitButtonBackground}>
                    <input
                        className={styles.submitButton}
                        type="submit"
                        value="Send Password Reset"
                        id="signin"
                        onClick={forgotPassword}
                    />
                </div>
            </div>
        </form>
    );
};

export default ForgotPasswordForm;
