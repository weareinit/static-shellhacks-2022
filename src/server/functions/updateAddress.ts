import { db } from "../firebaseApp";
import { Address } from "../../../util/types";
import { doc, updateDoc } from "firebase/firestore";

async function updateAddress(
    id: string,
    streetAddress: string,
    apartment: string,
    city: string,
    state: string,
    country: string,
    postalCode: string
): Promise<void> {
    const address: Address = {
        streetAddress: streetAddress,
        apartment: apartment,
        city: city,
        state: state,
        country: country,
        postalCode: postalCode,
    };
    const docRef = doc(db, "hackers", "" + id);

    await updateDoc(docRef, {
        address: address,
    });
}

export default updateAddress;
