import "./index.css";
import React from "react";
import { auth } from "../../server/firebaseApp";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginForm: React.FC = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const signIn = async (event: any) => {
        event.preventDefault();
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(user);
            setError("");

            // REDEFINE SO MODAL APPEARS AND UPON SUCCESS REDIRECT TO DASHBOARD
        } catch (error: any) {
            console.log(error);
            if (error.message === "Firebase: Error (auth/wrong-password).") {
                setError("Incorrect password. Try again.");
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
                        value="Login"
                        id="signin"
                        onClick={signIn}
                    />
                </div>
            </div>
        </form>
    );
};

export default LoginForm;
