import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseApp";

async function hasApplied(id: string): Promise<boolean> {
    const docRef = doc(db, "hackers", id);
    let result = false;
    await getDoc(docRef).then((docSnapshot) => {
        result = docSnapshot.exists();
    });

    return result;
}

export default hasApplied;
