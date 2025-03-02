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
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle input data here
    console.log('Input Data:', {
      gender,
      location,
      numVehicles,
      income,
      numChildren,
      numFamilyMembers,
      debt
    });

    // Navigate to the home page after input data is accepted
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
        <label htmlFor="numVehicles">Numer of Vehicles:</label>
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
    </div>
  );
};

export default UserDetailsForm;