import "./index.css";
import React from "react";
import { auth } from "../../server/firebaseApp";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUpForm: React.FC = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const signUp = async (event: any) => {
        event.preventDefault();
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(user);
            setError("");

            // REDEFINE SO MODAL APPEARS AND UPON SUCCESS REDIRECT TO APPLICATION
        } catch (error: any) {
            console.log(error.message);
            if (error.message === "Firebase: Error (auth/invalid-email).") {
                setError("Invalid email.");
            } else if (
                error.message ===
                "Firebase: Password should be at least 6 characters (auth/weak-password)."
            ) {
                setError("Password should be at least 6 characters.");
            } else {
                setError("Internal Error.");
            }
        }
    };

    return (
        <form>
            <div className="login-field">
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
            <div className="login-field">
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
            <h3 className="error">{error}</h3>
            <div className="button">
                <div className="submitButtonBackground">
                    <input
                        className="submitButton"
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
