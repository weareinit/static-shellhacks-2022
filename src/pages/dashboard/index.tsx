import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { db } from "../../server/firebaseApp";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  // use F9AxRFxYooMD4rdzKaZm as the example fetch
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>();

  const redir = useNavigate();

  useEffect(() => {
    // Fetch from firebase using auth.currentUser.uid
    if (getAuth().currentUser == null) {
      redir("/");
      // TODO: Check security on this. Not sure if this statement makes this route completely protected.
    } else {
      const uid = getAuth().currentUser?.uid.toString();
      const docRef = doc(db, "hackers", "" + uid); // Pass uid
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
    }
  }, []);

  const { firstName, lastName, address, shirtSize } = userData || {};

  // destructuring the apartment data
  const { apartment, city, country, postalCode, state, streetAddress } =
    address || {};

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
            <div className="information-view">
              <div className="fullname">
                <h3>Full Name:</h3>
                <p>
                  {firstName} {lastName}
                </p>
              </div>
              <div className="address-fields">
                <div className="address-information">
                  <h3>Address</h3>
                  <p>
                    {streetAddress} {apartment} {postalCode} {city}, {state}
                  </p>
                </div>
                <div
                  className="address-button"
                  // TODO: Change the styling
                >
                  <button>Edit</button>
                </div>
              </div>
              <div className="tshirt-size">
                <h3>T-Shirt Size</h3>
                <p>{shirtSize}</p>
              </div>
              <div className="resume">
                <h3>Resume (PDF Only):</h3>
                <button
                // TODO: make style for button
                >
                  Attach File
                </button>
                <p
                // TODO: Change into the file name when user attaches file
                >
                  Resume.pdf
                </p>
                <div className="icon-container">
                  {
                    // ICON Left
                  }
                  {
                    // ICON Right
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

/* 

*/
