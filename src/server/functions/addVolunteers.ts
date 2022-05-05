import { db } from "../firebaseApp";
import { Volunteers } from "../../../util/types";
import { addDoc, collection } from "firebase/firestore";

async function addVolunteers(user: Volunteers) {
  try {
    const docRef = await addDoc(collection(db, "volunteers"), user);
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.error("Error adding document: ", err);
  }
}

export default addVolunteers;
