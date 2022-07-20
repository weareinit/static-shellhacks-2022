import styles from "./index.module.css";
import React from "react";
import { auth } from "../../server/firebaseApp";
import { confirmPasswordReset } from "firebase/auth";
import ProgressModal, { ProgressState } from "../../components/ProgressModal";
import { FirebaseError } from "firebase/app";
import { formatError } from "../../util/errors";
import { useRouter } from "next/router";

const PasswordResetForm: React.FC = () => {
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [displayPopup, setDisplayPopup] = React.useState(false);
    const [popupState, setPopupState] = React.useState(
        ProgressState.PROCESSING
    );

    const router = useRouter();
    const query = router.query;
    const oobCode = query["oobCode"]?.toString() ?? "";

    const passwordReset = async (event: any) => {
        event.preventDefault();
        setPopupState(ProgressState.PROCESSING);
        setDisplayPopup(true);
        await confirmPasswordReset(auth, oobCode, password)
            .then(() => {
                setPopupState(ProgressState.COMPLETE);
                setTimeout(() => {
                    router.push("/entry");
                }, 3000);
            })
            .catch((e: FirebaseError) => {
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
                completeMessage="Password reset! Attempting to navigate to login page."
            />
            <div className={styles.passwordResetField}>
                <label htmlFor="password" id="password-label">
                    New Password
                </label>
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
            <div className={styles.buttonDiv}>
                <div className={styles.submitButtonBackground}>
                    <input
                        className={styles.submitButton}
                        type="submit"
                        value="Reset Password"
                        id="signin"
                        onClick={passwordReset}
                    />
                </div>
            </div>
        </form>
    );
};

export default PasswordResetForm;
