import { db } from "../firebaseApp";
import { Address, Hacker, HackerValues } from "../../../util/types";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import addResume from "./addResume";
import { updateProfile, User } from "firebase/auth";
import hasApplied from "./hasApplied";
import { FirebaseError } from "firebase/app";
import { sendApplicationEmail } from "./sendApplicationEmail";

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
        age: values.age,
        attendance: values.attendance,
        address: userAddress,
        school: values.school,
        levelOfStudy: values.levelOfStudy,
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
        isAccepted: false,
        isCheckedIn: false,
        isConfirmed: false,
        phoneNumber: values.phoneNumber,
    };
    await setDoc(doc(collection(db, "hackers"), currentUser.uid), hacker);
    await updateProfile(currentUser, {
        displayName: values.firstName + " " + values.lastName,
    });
    await sendApplicationEmail(currentUser, values.firstName);
}

export default addHacker;
