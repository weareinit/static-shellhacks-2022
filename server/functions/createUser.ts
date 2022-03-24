import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseApp";
import { User } from "../../util/types";

async function createUser(user: User) {
    createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // Continue with registration flow
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // Display error message on relevant components
            // https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#createuserwithemailandpassword
        });
}

export default createUser;
