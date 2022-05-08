import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { db } from "../../server/firebaseApp";

function Dashboard(props: any) {
  // use F9AxRFxYooMD4rdzKaZm as the example fetch
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    // Fetch from firebase using auth.currentUser.uid
    const uid = getAuth().currentUser?.uid.toString();
    const docRef = doc(db, "hackers", "" + "F9AxRFxYooMD4rdzKaZm"); // Pass uid

    /* 
      if user is not logged in, redirect them to the user dashboard to protect the route.
      */

    const fetchData = async () => {
      console.log("Page Loading");
      try {
        const docSnap = await getDoc(docRef);
        setUserData(docSnap.data());
        setIsLoading(false);
        console.log(userData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Example fetch: userData?.["address"]["city"]
  const {
    firstName,
    lastName,
    email,
    major,
    gradYear,
    classStanding,
    ethnicity,
    gender,
    race,
  } = userData || {};
  const basicInfo = [
    firstName,
    lastName,
    email,
    major,
    gradYear,
    classStanding,
    ethnicity,
    gender,
    race,
  ];

  const basicInfoList = basicInfo.map((info) => {
    return (
      <div>
        <li>{info}</li>
      </div>
    );
  });

  return (
    <div>
      {!isLoading && (
        <div>
          <div className="sidebar">
            <div>
              <h3>Application Status</h3>
              <p>
                APPLIED!
                {
                  // Applied if document exists in firebase
                }
              </p>
            </div>

            <div>
              <h3>Hacker Guide</h3>
              <p>COMING SOON</p>
            </div>

            <div>
              <h3>QR Code for Check-In</h3>
              <p>NULL</p>
            </div>

            <div>
              <h3>Contact Us</h3>
              <p>OUR INFO HERE</p>
            </div>
          </div>

          <div className="application-information">
            <h2>Application Information View</h2>
            <div>{basicInfoList}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

/* 

*/
