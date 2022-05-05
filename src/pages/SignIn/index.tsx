import "./index.css";
import React from "react";
import { auth } from "../../server/firebaseApp";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const LoginPage: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, setUser] = React.useState<any>({});
  const [error, setError] = React.useState("");

  onAuthStateChanged(auth, (currentUser: any) => {
    setUser(currentUser);
  });

  const signIn = async (event: any) => {
    event.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      setError("");
    } catch (error: any) {
      console.log(error);
      if (error.message === "Firebase: Error (auth/wrong-password).") {
        setError("Incorrect password. Try again.");
      }
    }
  };

  const signUp = async (event: any) => {
    event.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      setError("");
    } catch (error: any) {
      console.log(error.message);
      if (error.message === "Firebase: Error (auth/invalid-email).") {
        setError("Invalid email.");
      } else if (error.message === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
        setError("Password should be at least 6 characters.");
      } else {
        setError("Internal Error.");
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="login-form-wrapper">
      <form className="login-form">
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
        <div className="buttons">
          <input type="submit" value="Sign In" id="signin" onClick={signIn} />
          <input type="submit" value="Sign Up" id="signup" onClick={signUp} />
        </div>
        {!user && <h3 className="error">{error}</h3>}
      </form>
      <div className="currentUserAndLogout">
        <div className="currentUser">{user?.email}</div>
        <button id="logout" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
