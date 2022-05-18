import { useEffect, useState } from "react";
import { auth } from "./firebaseApp";

function useAuthListener() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      }
      setCheckingStatus(false);
    });
  }, []);

  return { isLoggedIn };
}

export default useAuthListener;
