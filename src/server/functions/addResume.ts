import { storage } from "../firebaseApp";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { User } from "firebase/auth";

async function addResume(
    resume: File,
    id: string
): Promise<{ url: string; name: string }> {
    const storageRef = ref(storage, id + "/" + resume.name);
    const result = await uploadBytes(storageRef, resume);
    const url = await getDownloadURL(storageRef);
    const name = result.metadata.name;
    return { url, name };
}

export default addResume;
