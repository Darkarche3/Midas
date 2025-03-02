import React, { useState, useEffect, useContext } from "react";
import { PrecisionContext } from '../../Contexts/PrecisionContext'; // Import the context
import { db, auth } from '../../config/firebase.js'; // Import Firestore and Auth
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged
import "./homePage.scss";

const HomePage = () => {
  const { amountLocked, setAmountLocked } = useContext(PrecisionContext); // Use the context
  const [progress] = useState(50); // Example initial value

  useEffect(() => {
    const fetchAmountLocked = async (user) => {
      if (user) {
        const userDoc = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (userData.prediction) {
            setAmountLocked(userData.prediction);
          }
        }
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchAmountLocked(user);
      }
    });

    const progressBar = document.querySelector(".app-progress-bar");
    if (progress >= 75) {
      progressBar.className = "app-progress-bar green";
    } else if (progress >= 25) {
      progressBar.className = "app-progress-bar yellow";
    } else {
      progressBar.className = "app-progress-bar red";
    }

    return () => unsubscribe(); // Cleanup the observer on unmount
  }, [progress, setAmountLocked]);

  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">MIDAS</h1>
      </div>
      <div className="app-bar-container">
        <div className="app-progress-bar-container">
          <div
            className="app-progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <p className="app-lock-status">{`Amount Locked: $${amountLocked}`}</p>
      <div className="app-activity-button">ACTIVITY</div>
      <div className="app-table-container">
        <div className="app-table-header">
          <table className="app-table">
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="app-table-body">
          <table className="app-table">
            <tbody>
              <tr>
                <td>Transaction 1</td>
                <td>Date 1</td>
                <td>Amount 1</td>
                <td>Status 1</td>
              </tr>
              <tr>
                <td>Transaction 2</td>
                <td>Date 2</td>
                <td>Amount 2</td>
                <td>Status 2</td>
              </tr>
              <tr>
                <td>Transaction 3</td>
                <td>Date 3</td>
                <td>Amount 3</td>
                <td>Status 3</td>
              </tr>
              <tr>
                <td>Transaction 4</td>
                <td>Date 4</td>
                <td>Amount 4</td>
                <td>Status 4</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;