// ./initAuth.js
import { app } from "../server/firebaseApp";
import { init } from "next-firebase-auth";

app;

const initAuth = () => {
    init({
        authPageURL: "/entry",
        appPageURL: "/",
        loginAPIEndpoint: "/api/nextlogin", // required
        logoutAPIEndpoint: "/api/logout", // required
        onLoginRequestError: (err) => {
            console.error(err);
        },
        onLogoutRequestError: (err) => {
            console.error(err);
        },
        // Use application default credentials (takes precedence over fireaseAdminInitConfig if set)
        // useFirebaseAdminDefaultCredential: true,
        firebaseClientInitConfig: {
            apiKey: "AIzaSyDXMRgCJzlUGQWAczPURoz39H1a8_QUhHs", // required
            // authDomain: "shellhacks2022.firebaseapp.com",
            // databaseURL: "https://shellhacks2022-default-rtdb.firebaseio.com",
            // projectId: "shellhacks2022",
        },
        firebaseAdminInitConfig: {
            credential: {
                projectId: "shellhacks2022",
                clientEmail:
                    "firebase-adminsdk-fz1lg@shellhacks2022.iam.gserviceaccount.com",
                // The private key must not be accessible on the client side.
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(
                    /\\n/g,
                    "\n"
                ),
            },
            databaseURL: "https://shellhacks2022-default-rtdb.firebaseio.com",
        },
        cookies: {
            name: "shellhacks2022", // required
            // Keys are required unless you set `signed` to `false`.
            // The keys cannot be accessible on the client side.
            keys: [
                process.env.COOKIE_SECRET_CURRENT,
                process.env.COOKIE_SECRET_PREVIOUS,
            ],
            httpOnly: true,
            maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
            overwrite: true,
            path: "/",
            sameSite: "strict",
            secure: false, // set this to false in local (non-HTTPS) development
            signed: false,
        },
        onVerifyTokenError: (err) => {
            console.error(err);
        },
        onTokenRefreshError: (err) => {
            console.error(err);
        },
    });
};

export default initAuth;
