import { db } from "../firebaseApp";
import { Address, Hacker, Values } from "../../../util/types";
import { addDoc, collection } from "firebase/firestore";

async function addHacker(values: Values) {
  const userAddress: Address = {
    streetAddress: values.addressLine1,
    apartment: values.addressLine2,
    city: values.city,
    state: values.state,
    country: values.country,
    postalCode: values.zipcode,
  };
  const user: Hacker = {
    id: values.email,
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    isRemote: values.isRemote,
    address: userAddress,
    school: values.school,
    major: values.major,
    classStanding: values.classStanding,
    gradYear: values.graduationYear,
    gender: values.gender,
    ethnicity: values.ethnicity,
    race: values.race,
    shirtSize: values.tshirtSize,
    roles: values.whichRoleBestDescribesYou,
    attendedHackathon: values.haveYouAttendedAHackathonBefore,
    attendedShellHacks: values.haveYouAttendedShellhacksBefore,
    heardAboutShellHacks: values.howDidYouHearAboutShellhacks,
    interestResponse: values.whyAreYouInterestedInParticipatingInShellhacks,
    linkedin: values.linkedIn,
    github: values.github,
    website: values.website,
    isAdult: values.isAdult,
    isSharingInfo: values.isSharingInfo,
    agreedMLH: values.agreedMLH,
    agreedTerms: values.agreedTerms,
    agreedCommunications: values.agreedCommunications,
  };
  try {
    const docRef = await addDoc(collection(db, "hackers"), user);
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.error("Error adding document: ", err);
  }
}

export default addHacker;
