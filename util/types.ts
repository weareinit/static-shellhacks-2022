import { Timestamp } from "firebase/firestore";
import { Url } from "url";

export type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export type Address = {
    streetAddress: string;
    apartment: string;
    city: string;
    state: string;
    country: string;
    postalcode: string;
};

export type Hacker = {
    id: string;
    timeCreated: Timestamp;
    firstName: string;
    lastName: string;
    email: string;
    isRemote: boolean;
    address: Address;
    school: string;
    major: string;
    classStanding: string;
    gradYear: number;
    gender: string;
    ethnicity: string;
    race: string;
    shirtSize: string;
    roles: Array<string>;
    attendedHackathon: string;
    attendedShellHacks: Array<string>;
    heardAboutShellHacks: Array<string>;
    interestResponse: string;
    linkedin?: string;
    github?: string;
    website?: string;
    resumeUrl: Url;
    isAdult: boolean;
    isSharingInfo: boolean;
    agreedMLH: boolean;
    agreedTerms: boolean;
    agreedCommunications: boolean;
};
