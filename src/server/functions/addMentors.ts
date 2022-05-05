import { db } from "../firebaseApp";
import { Mentors } from "../../../util/types";
import { addDoc, collection } from "firebase/firestore";

async function addMentors(user: Mentors) {
  try {
    const docRef = await addDoc(collection(db, "mentors"), user);
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.error("Error adding document: ", err);
  }
}

export default addMentors;
