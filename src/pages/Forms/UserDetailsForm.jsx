import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDetailsForm.scss';

const UserDetailsForm = () => {
  const [gender, setGender] = useState('Male');
  const [location, setLocation] = useState('City');
  const [numVehicles, setNumVehicles] = useState(0);
  const [income, setIncome] = useState(0);
  const [numChildren, setNumChildren] = useState(0);
  const [numFamilyMembers, setNumFamilyMembers] = useState(1);
  const [debt, setDebt] = useState(0);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Collect form data
    const formData = {
      gender,
      location,
      numVehicles,
      income,
      numChildren,
      numFamilyMembers,
      debt
    };

    try {
      const response = await fetch('http://localhost:5001/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      //console.log(data);
      
      if (data.error) {
        setError(data.error);
        setPrediction(null);
      } else {
        setPrediction(data.prediction);
        setError(null);
      }
    } catch (error) {
      setError('Error occurred while making the prediction');
      setPrediction(null);
    }
    navigate('/home');
  };

  return (
    <div className="user-details-form-container">
      <h2>User Details Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <select id="location" value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="City">City</option>
            <option value="Suburb">Suburb</option>
            <option value="Rural">Rural</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="numVehicles">Number of Vehicles:</label>
          <input
            type="number"
            id="numVehicles"
            value={numVehicles}
            onChange={(e) => setNumVehicles(e.target.value)}
            min="0"
          />
        </div>
        <div className="form-group">
          <label htmlFor="income">Income:</label>
          <input
            type="number"
            id="income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            min="0"
          />
        </div>
        <div className="form-group">
          <label htmlFor="numChildren">Number of Children:</label>
          <input
            type="number"
            id="numChildren"
            value={numChildren}
            onChange={(e) => setNumChildren(e.target.value)}
            min="0"
            step="1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="numFamilyMembers">Number of Family Members:</label>
          <input
            type="number"
            id="numFamilyMembers"
            value={numFamilyMembers}
            onChange={(e) => setNumFamilyMembers(e.target.value)}
            min="1"
            step="1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="debt">Debt:</label>
          <input
            type="number"
            id="debt"
            value={debt}
            onChange={(e) => setDebt(e.target.value)}
            min="0"
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {prediction && (
        <div className="prediction-result">
          <h3>Prediction Result:</h3>
          <p>{prediction}</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default UserDetailsForm;
