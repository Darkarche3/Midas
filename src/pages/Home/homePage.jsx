import React, { useState, useEffect } from 'react';
import './homePage.scss';

const HomePage = () => {
  const [progress] = useState(50); // Example initial value

  useEffect(() => {
    const progressBar = document.querySelector('.app-progress-bar');
    if (progress >= 75) {
      progressBar.className = 'app-progress-bar green';
    } else if (progress >= 25) {
      progressBar.className = 'app-progress-bar yellow';
    } else {
      progressBar.className = 'app-progress-bar red';
    }
  }, [progress]);


  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">MIDAS</h1>
      </div>
      <div className="app-bar-container">
        <div className="app-progress-bar-container">
          <div className="app-progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <p className="app-lock-status">{'Amount Locked: $0'}</p>
      <button className="app-activity-button">ACTIVITY</button>
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
      <span role="img" aria-label="fire" className="app-fire-bottom">🔥</span>
    </div>
  );
};

export default HomePage;