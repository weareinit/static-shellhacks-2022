import styles from "./index.module.css";
import React, { createRef, FormEvent } from "react";
import ProgressModal, { ProgressState } from "../../components/ProgressModal";
import { formatError } from "../../util/errors";
import { useRouter } from "next/router";
import { useAuthUser, withAuthUser } from "next-firebase-auth";
import loginUser from "../../server/functions/loginUser";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

const LoginForm: React.FC = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [errorOccured, setErrorOccured] = React.useState(false);
    const [displayPopup, setDisplayPopup] = React.useState(false);
    const [disableSubmit, setDisableSubmit] = React.useState(true);

    const router = useRouter();
    const recaptchaRef = createRef();
    const user = useAuthUser();

    const login = async (event: any) => {
        event.preventDefault();
        // @ts-ignore
        const recaptchaValue = recaptchaRef.current.getValue();
        if (recaptchaValue === "") return;

        await axios
            .post("/verifyRecaptcha", { token: recaptchaValue })
            .then((res) => {
                if (res.status != 200) {
                    setErrorOccured(true);
                    return;
                }
            })
            .catch((error) => {
                console.log(error);
                setErrorOccured(true);
                return;
            });

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
        <form
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
                login(e);
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
                        value="Login"
                        id="signin"
                        disabled={disableSubmit}
                    />
                </div>
            </div>
        </form>
    );
};

export default withAuthUser()(LoginForm);
