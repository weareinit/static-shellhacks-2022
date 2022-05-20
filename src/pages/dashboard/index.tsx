import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { auth, db } from "../../server/firebaseApp";
import { useNavigate } from "react-router-dom";
import ChangeAddress from "./formContent";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<DocumentData | undefined>();
  const [changingAddress, setChangingAddress] = useState(false);

  const navigate = useNavigate();

  const user = getAuth().currentUser;
  useEffect(() => {
    // ! We need to conduct tests to see if every reload results in a refetch.
    // console.log("Mounting");
    const docRef = doc(db, "hackers", "" + user?.uid);
    const fetchData = async () => {
      // console.log("Page Loadding");
      await getDoc(docRef)
        .then((rawData) => {
          const data: DocumentData | undefined = rawData.data();
          // console.log("user data: ");
          // console.log(data);
          setUserData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [user]);

  const { firstName, lastName, address, shirtSize } = userData || {};
  const { apartment, city, country, postalCode, state, streetAddress } =
    address || {};

  return (
    <div>
      {!isLoading && (
        <div>
          <div className="sidebar">
            <button
              onClick={async () => {
                await auth.signOut();
                navigate("/");
              }}
            >
              Log Out
            </button>
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
                  <button
                    onClick={() => {
                      setChangingAddress(true);
                      console.log("Changing Address");
                      console.log(changingAddress);
                    }}
                  >
                    change address
                  </button>
                  <p>
                    {streetAddress} {apartment} {postalCode} {city}, {state}{" "}
                    {country}
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

              <div className="change-address">

                {
                  changingAddress && (
                  <div>
                    <ChangeAddress />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <div>
          <h1>Oops unexpected error! Please refresh page!</h1>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

/* 

*/
