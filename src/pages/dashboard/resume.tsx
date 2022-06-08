import { getAuth, User } from "firebase/auth";
import { storage } from "../../server/firebaseApp";

import { ref, uploadBytes } from "firebase/storage";

async function onSubmitHandler(file: File) {
  // TODO: Work on this section of the code.
  return;
}

function Resume() {
  // TODO IMPLEMENT RESUME COMPONENT WITH FILE UPLOAD
  const user: User | null = getAuth().currentUser;

  return <div>Resume Field</div>;
}

export default Resume;
