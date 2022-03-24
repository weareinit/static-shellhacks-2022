import { db } from "../firebaseApp";
import { Hacker } from "../../util/types";
import { addDoc, collection } from "firebase/firestore";

async function addHacker(user: Hacker) {
    try {
        const docRef = await addDoc(collection(db, "hackers"), user);
        console.log("Document written with ID: ", docRef.id);
    } catch (err) {
        console.error("Error adding document: ", err);
    }
}

export default addHacker;
