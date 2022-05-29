import "./index.css";
import React from "react";
import { auth } from "../../server/firebaseApp";
import { confirmPasswordReset } from "firebase/auth";
import ProgressModal, { ProgressState } from "../../components/ProgressModal";
import { FirebaseError } from "firebase/app";
import { useLocation, useNavigate } from "react-router-dom";
import { formatError } from "../../util/errors";

function useQuery() {
    const location = useLocation();
    return new URLSearchParams(location.search);
}

const PasswordResetForm: React.FC = () => {
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [displayPopup, setDisplayPopup] = React.useState(false);
    const [popupState, setPopupState] = React.useState(
        ProgressState.PROCESSING
    );

    const navigate = useNavigate();
    const query = useQuery();
    const oobCode = query.get("oobCode") ?? "";

    const passwordReset = async (event: any) => {
        event.preventDefault();
        setPopupState(ProgressState.PROCESSING);
        setDisplayPopup(true);
        await confirmPasswordReset(auth, oobCode, password)
            .then(() => {
                setPopupState(ProgressState.COMPLETE);
                setTimeout(() => {
                    navigate("/entry");
                }, 5000);
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
                completeMessage="Password reset! Attempting to navigate to login page."
            />
            <div className="login-field">
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
            <div className="buttonDiv">
                <div className="submitButtonBackground">
                    <input
                        className="submitButton"
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
