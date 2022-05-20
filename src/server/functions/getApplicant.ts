import { db } from '../firebaseApp';
import {
  collection,
  getDocs,
  where,
  query,
  CollectionReference,
  DocumentData,
  Query,
} from 'firebase/firestore';

/**
 * Use this function to query firestore for a specific email in a collection.
 * Useful for verifying if a user has submitted an application for shellhacks.
 * 
 * @param {string} collection What collection to search in (i.e. hackers, mentors, volunteers)
 * @param {string} email The email of the user
 * @usage 
 *  const data = GetApplicant("hackers", "test3@gmail.com");
 *  data.then(res => console.log(res))
 * @return {Promise<any>} Returns the data of the queried user, or false if a record is not found
*/
const GetApplicant = async (coll: string, email: string) => {
  const hackersRef: CollectionReference<DocumentData> = await collection(
    db,
    coll
  );
  const q: Query = query(hackersRef, where('email', '==', email));
  const snapshot: DocumentData = await getDocs(q);
  if (snapshot.docs.length > 0) return snapshot.docs[0].data();
  else return false;
};

export default GetApplicant;
