import { Timestamp } from "firebase/firestore";
import { SelectionRange, StringLiteralLike } from "typescript";
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
    postalCode: string;
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
    race: Array<string>;
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

export type Mentors = {
    id: string;
    timeCreated: Timestamp;
    firstName: string;
    lastName: string;
    email: string;
    isRemote: boolean;
    address: Address;
    school: string;
    shirtSize: string; 
    race: Array<string>; 
    roles: Array<string>; 
    technologies: Array<string>; 
    availabilityMentor: string; 
    attendedHackathon: string; 
    attendedShellHacks: Array<string>; 
    heardAboutShellHacks: Array<string>; 
    interestRespone: string; 
    linkedin?: string; 
    github?: string; 
    website?: string; 
    isAdult: boolean; 
    agreedMLH: boolean; 
    agreedTerms: boolean; 
    agreedCommunication: boolean; 
};

export type Volunteers = { 
     id: string; 
     timeCreated: Timestamp; 
     firstName: string; 
     lastName: string; 
     email: string; 
     address: Address; 
     school: string; 
     shirtSize: string; 
     availabilityVolunteer: string; 
     heardAboutShellhacks: string; 
     interestResponse: string; 
     isAdult: boolean; 
     agreedMLH: boolean; 
     agreedTerms: boolean; 
     agreedCommunication: boolean; 
};