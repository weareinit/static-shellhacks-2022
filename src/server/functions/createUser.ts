import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseApp";

async function createUser(email: string, password: string): Promise<void> {
    await createUserWithEmailAndPassword(auth, email, password);
}

export default createUser;
