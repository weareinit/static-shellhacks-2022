import { db } from "../firebaseApp";
import { Address } from "../../../util/types";
import { doc, updateDoc } from "firebase/firestore";
import addResume from "./addResume";

async function updateResume(resume: File, id: string): Promise<void> {
    const { url, name } = await addResume(resume, id);
    const docRef = doc(db, "hackers", "" + id);

    await updateDoc(docRef, {
        resumePath: url,
        resumeName: name,
    });
}

export default updateResume;
