import { db } from "../firebaseApp";
import { Address, Hacker, HackerValues } from "../../../util/types";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import addResume from "./addResume";
import { User } from "firebase/auth";
import hasApplied from "./hasApplied";
import { FirebaseError } from "firebase/app";

async function addHacker(
    values: HackerValues,
    currentUser: User
): Promise<void> {
    if (await hasApplied(currentUser.uid))
        throw new FirebaseError("", "Application Already Exists");
    const { url, name } = await addResume(values.file, currentUser.uid);
    const userAddress: Address = {
        streetAddress: values.addressLine1,
        apartment: values.addressLine2,
        city: values.city,
        state: values.state,
        country: values.country,
        postalCode: values.zipcode,
    };
    const hacker: Hacker = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: currentUser.email ? currentUser.email : "",
        attendance: values.attendance,
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
        resumePath: url,
        resumeName: name,
        linkedin: values.linkedIn,
        github: values.github,
        website: values.website,
        isAdult: values.isAdult,
        isSharingInfo: values.isSharingInfo,
        agreedMLH: values.agreedMLH,
        agreedTerms: values.agreedTerms,
        agreedCommunications: values.agreedCommunications,
        agreedPrize: values.agreedPrize,
        timeCreated: Timestamp.now(),
        dateCreated: Timestamp.now().toDate(),
    };
    await setDoc(doc(collection(db, "hackers"), currentUser.uid), hacker);
}

export default addHacker;
