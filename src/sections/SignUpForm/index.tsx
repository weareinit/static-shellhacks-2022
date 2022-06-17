import styles from "./index.module.css";
import React from "react";
import ProgressModal, { ProgressState } from "../../components/ProgressModal";
import { FirebaseError } from "firebase/app";
import { formatError } from "../../util/errors";
import { useRouter } from "next/router";
import createUser from "../../server/functions/createUser";

const SignUpForm: React.FC = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [errorOccured, setErrorOccured] = React.useState(false);
    const [displayPopup, setDisplayPopup] = React.useState(false);

    const router = useRouter();

    const signUp = async (event: any) => {
        event.preventDefault();
        setErrorOccured(false);
        setDisplayPopup(true);
        await createUser(email, password)
            .then(() => {
                router.push("/application");
            })
            .catch((e: FirebaseError) => {
                console.log(e.code);
                setErrorOccured(true);
                setError(formatError(e));
            });
    };

    return (
        <form>
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
            <div className={styles.buttonDiv}>
                <div className={styles.submitButtonBackground}>
                    <input
                        className={styles.submitButton}
                        type="submit"
                        value="Sign Up"
                        id="signup"
                        onClick={signUp}
                    />
                </div>
            </div>
        </form>
    );
};

export default SignUpForm;
