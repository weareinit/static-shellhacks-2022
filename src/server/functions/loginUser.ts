import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseApp";

async function loginUser(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password);
}

export default loginUser;
