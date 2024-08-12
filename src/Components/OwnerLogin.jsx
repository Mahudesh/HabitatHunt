import React, { useState,useContext } from 'react';
import '../Assets/AdminLogin.css'; // Path to your CSS file
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import SlidingPanel from './SlidingPanel';
import axios from 'axios';
import { AuthContext } from '../App'; // Import the AuthContext
const OwnerLogin = () => {
  const [formData, setFormData] = useState({
    ownerEmail: '',
    ownerPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation
  const { handleLogin } = useContext(AuthContext); // Access handleLogin from context
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
        const response = await axios.post('http://localhost:8080/api/owner/login', formData);
        const { ownerId, ownerName } = response.data; 
        console.log("OwnerId-- ",ownerId);
        localStorage.setItem('ownerName', ownerName);
        handleLogin(ownerName);

       
        navigate(`/owner-page/${ownerId}`); // Redirect to OwnerPage with ownerId
    } catch (error) {
        console.error("There was an error logging in", error);
        setError("Invalid email or password");
    }
};

  return (
    <div>
      <div className='login-body'>
        <Navbar />
        <div className="login-box">
          <h2 style={{ marginLeft: '150px' }}>OWNER LOGIN</h2>
          <form onSubmit={handleSubmit}>
            <div className="user-box">
              <input
                type="email"
                name="ownerEmail"
                required
                value={formData.ownerEmail}
                onChange={handleChange}
              />
              <label>Email address</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                name="ownerPassword"
                required
                value={formData.ownerPassword}
                onChange={handleChange}
              />
              <label>Password</label>
            </div>
            {error && (
              <h3 style={{ color: 'red', fontWeight: '20px' }}>{error}</h3>
            )}
            <div className="button-container">
              <button
                className='submit'
                type="submit"
              >
                Login
              </button>
              <FcGoogle className="google-icon" />
              <FaFacebook className='google-icon' />
            </div>
          </form>
        </div>
        <SlidingPanel />
      </div>
    </div>
  );
};

export default OwnerLogin;
