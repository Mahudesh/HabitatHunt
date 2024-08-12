// src/components/ForgotPassword.jsx
import React, { useState } from 'react';
import '../Assets/Login.css'; // Import the same CSS file used in Login.jsx
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SlidingPanel from './SlidingPanel';
import Navbar from './Navbar';

const ForgotPassword = () => {
  const [resetData, setResetData] = useState({ emailId: '', password: '' });
  const navigate = useNavigate(); // Hook for navigation

  const handleResetChange = (e) => {
    const { name, value } = e.target;
    setResetData({
      ...resetData,
      [name]: value,
    });
  };

  const handleResetSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!resetData.password.trim()) {
      alert("Password cannot be empty.");
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/auth/reset-password', resetData);
      alert("Password update successful");
      navigate('/login'); // Redirect to login page after successful password update
    } catch (error) {
      console.error("There was an error updating the password", error);
      alert("Failed to update password");
    }
  };

  return (
    <div className='login-body'>
        <Navbar/>
        <SlidingPanel/>
      <div className="login-box">
        <div className='login-heading'>
          <h2>Forgot Password</h2>
        </div>
        <form onSubmit={handleResetSubmit}>
          <div className="user-box">
            <input 
              type="email" 
              name="emailId" 
              required 
              value={resetData.emailId} 
              onChange={handleResetChange}
            />
            <label>Email address</label>
          </div>
          <div className="user-box">
            <input 
              type="password" 
              name="password" 
              required 
              value={resetData.password} 
              onChange={handleResetChange} 
            />
            <label>New Password</label>
          </div>
          <div className="button-container">
            <button className='submit' type="submit">
              Update
            </button>
            <button className='submit' onClick={() => navigate('/login')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
