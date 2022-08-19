import { db } from "../firebaseApp";
import { doc, updateDoc } from "firebase/firestore";

async function notAttending(id: string): Promise<void> {
    const docRef = doc(db, "hackers", "" + id);

    await updateDoc(docRef, {
        notAttending: true,
    });
}

export default notAttending;
