import { auth } from "../../server/firebaseApp";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function getLogin(req, res) {
  const userEmail = req.email;
  const userPassword = req.password;

  await signInWithEmailAndPassword(auth, userEmail, userPassword);
}
