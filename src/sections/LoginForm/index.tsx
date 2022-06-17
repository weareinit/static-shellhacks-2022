import styles from "./index.module.css";
import React from "react";
import ProgressModal, { ProgressState } from "../../components/ProgressModal";
import { formatError } from "../../util/errors";
import { useRouter } from "next/router";
import { useAuthUser, withAuthUser } from "next-firebase-auth";
import loginUser from "../../server/functions/loginUser";

const LoginForm: React.FC = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [errorOccured, setErrorOccured] = React.useState(false);
    const [displayPopup, setDisplayPopup] = React.useState(false);

    const router = useRouter();

    const user = useAuthUser();

    const login = async (event: any) => {
        event.preventDefault();
        setErrorOccured(false);
        setDisplayPopup(true);

        await loginUser(email, password)
            .then(() => {
                router.push("/dashboard");
            })
            .catch((e) => {
                console.log(e);
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
            <div className={styles.loginField}>
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
            <div className={styles.loginField}>
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
                        value="Login"
                        id="signin"
                        onClick={login}
                    />
                </div>
            </div>
        </form>
    );
};

export default withAuthUser()(LoginForm);
