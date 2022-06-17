import { doc, getDoc } from "firebase/firestore";
import { Hacker } from "../../../util/types";
import { db } from "../firebaseApp";

async function getHacker(id: string): Promise<Hacker | null> {
    const docRef = doc(db, "hackers", id);
    let data = null;

    await getDoc(docRef)
        .then((snapshot) => {
            data = snapshot.data();
        })
        .catch((error) => {
            throw error;
        });

    return data;
}

export default getHacker;
