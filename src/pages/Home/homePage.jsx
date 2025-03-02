import React, { useState, useEffect, useContext } from "react";
import { PrecisionContext } from '../../Contexts/PrecisionContext'; // Import the context
import { db, auth } from '../../config/firebase.js'; // Import Firestore and Auth
import { collection,doc, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged
import "./homePage.scss";

const HomePage = () => {
  const { amountLocked, setAmountLocked } = useContext(PrecisionContext); // Use the context
  const [progress, setProgress] = useState(0); // Initialize progress as 0
  const [transactions, setTransactions] = useState([]); // Store transaction data
  const [prediction, setPrediction] = useState(0); // Store prediction value from the users collection


  // Fetch transactions from Firestore
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "transactions"));
        const transactionsData = querySnapshot.docs.map(doc => doc.data());
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []); // Empty dependency array means it runs once when the component mounts

  // Fetch the prediction value from the users collection
  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const userSnapshot = await getDocs(collection(db, "users"));
        const userData = userSnapshot.docs.map(doc => doc.data());
        if (userData.length > 0) {
          // Assuming we are using the first user's prediction value
          setPrediction(userData[0].prediction || 0); // Default to 0 if no prediction value
        }
      } catch (error) {
        console.error("Error fetching prediction:", error);
      }
    };

    fetchPrediction();
  }, []); // Empty dependency array means it runs once when the component mounts

  // Calculate the progress based on transactions and prediction value
  useEffect(() => {
    const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    if (prediction > 0) {
      const newProgress = ((prediction - totalAmount) / prediction) * 100; // Calculate progress with (b - a) / b formula
      setProgress(newProgress); // Set the calculated progress
    }
  }, [transactions, prediction]); // Recalculate progress when transactions or prediction changes

  // Update progress bar color based on the progress value
  useEffect(() => {
    const fetchAmountLocked = async (user) => {
      if (user) {
        const userDoc = doc(db, 'users', user.uid);
        const docSnap = await getDocs(userDoc);
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
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No transactions available
                  </td>
                </tr>
              ) : (
                transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.merchant_name || "N/A"}</td>
                    <td>{transaction.date || "N/A"}</td>
                    <td>{transaction.amount || "N/A"}</td>
                    <td>{transaction.status || "N/A"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;