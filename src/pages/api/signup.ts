import { auth } from "../../server/firebaseApp";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default async function getSignUp(req: any) {
  const userEmail = req.email;
  const userPassword = req.password;

  await createUserWithEmailAndPassword(auth, userEmail, userPassword);
}
