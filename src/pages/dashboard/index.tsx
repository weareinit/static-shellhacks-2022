import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { auth, db } from "../../server/firebaseApp";
import { useNavigate } from "react-router-dom";
import ChangeAddress from "./formContent";
import Resume from "./resume";

//
async function handleAddressChange(newAddress: {}) {}

async function handleResumeChange(file: any) {}

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<DocumentData | undefined>();
  const [changingAddress, setChangingAddress] = useState(false);
  const [hasDocument, setHasDocument] = useState(false); // This is to check if the user has a document in the firestore.

  const { firstName, lastName, address, shirtSize } = userData || {};
  const { apartment, city, country, postalCode, state, streetAddress } =
    address || {};

  const navigate = useNavigate();
  const user = getAuth().currentUser;

  useEffect(() => {
    const docRef = doc(db, "hackers", "" + user?.uid);

    // Defining the fetch data function.
    const fetchData = async () => {
      await getDoc(docRef)
        .then((rawData) => {
          const data: DocumentData | undefined = rawData.data();
          setUserData(data);
          console.log("Component Did Fetch");
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // checking if the document exists in the collection. If it does, then it calls teh fetch data function.
    const checkIfDocExists = async () => {
      await getDoc(docRef).then((doc) => {
        if (doc.exists()) {
          fetchData(); // if fetch data succeeds, then the data has successfully been fetched.
          setIsLoading(false);
          setHasDocument(true);
        } else {
          setHasDocument(false);
        }
      });
    };

    checkIfDocExists();
  }, [user]);

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
                      setChangingAddress(!changingAddress);
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
              {
                // <Resume></Resume>
              }
              <div className="change-address">
                {changingAddress && (
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
