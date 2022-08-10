import { db } from "../firebaseApp";
import { doc, updateDoc } from "firebase/firestore";

async function confirmHacker(id: string): Promise<void> {
    const docRef = doc(db, "hackers", "" + id);

    await updateDoc(docRef, {
        isConfirmed: true,
    });
}

export default confirmHacker;
