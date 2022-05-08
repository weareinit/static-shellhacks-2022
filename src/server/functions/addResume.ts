import { storage } from "../firebaseApp";
import { ref, uploadBytes } from "firebase/storage";
import { User } from "firebase/auth";

async function addResume(resume: File, currentUser: User): Promise<string> {
    const storageRef = ref(storage, currentUser.uid + "/" + resume.name);
    const result = await uploadBytes(storageRef, resume);
    return result.metadata.fullPath;
}

export default addResume;
