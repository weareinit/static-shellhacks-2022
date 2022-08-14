import { db } from "../firebaseApp";
import { doc, updateDoc } from "firebase/firestore";
import { sendConfirmationEmail } from "./sendConfirmationEmail";

async function confirmHacker(
    id: string,
    email: string,
    name: string,
    attendance: string
): Promise<void> {
    const docRef = doc(db, "hackers", "" + id);

    await updateDoc(docRef, {
        isConfirmed: true,
    });

    await sendConfirmationEmail(email, name, attendance);
}

export default confirmHacker;
