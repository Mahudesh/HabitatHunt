import React, { useState, useContext } from 'react';
import '../Assets/Login.css'; // Path to your Login.css file
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Footer from './Footer';
import SlidingPanel from './SlidingPanel'; // Import the SlidingPanel component
import { AuthContext } from '../App'; // Import the AuthContext
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        emailId: '',
        password: '',
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
            const response = await axios.post('http://localhost:8080/api/auth/login', formData);
            console.log("User logged in", response.data);

            if (response.data.message === "Admin") {
                navigate('/admin'); // Navigate to the admin page
            } else {
                // Call handleLogin to update auth context
                
                handleLogin(formData.emailId, response.data.userId);    
    
                navigate(`/${response.data.userId}`); 
            }
        } catch (error) {
            console.error("There was an error logging in", error);
            setError("Invalid email or password");
        }
    };

  


    return (
        <div>
            <div className='login-body'>
                <Navbar />
                <SlidingPanel />
                <div className="login-box">
                    <div className='login-heading'>
                        <h2>LOGIN</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="user-box">
                            <input 
                                type="email" 
                                name="emailId" 
                                required 
                                value={formData.emailId}
                                onChange={handleChange}
                                pattern="^[^@]+@[^@]+\.[^@]+$" 
                                title="Please enter a valid email address"
                            />
                            <label>Email address</label>
                        </div>
                        <div className="user-box">
                            <input 
                                type="password" 
                                name="password" 
                                required 
                                value={formData.password} 
                                onChange={handleChange} 
                            />
                            <label>Password</label>
                        </div>
                        {error && (
                            <h3 style={{ color: 'red', fontWeight: '20px' }}>{error}</h3>
                        )}
                        <br />
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
                        <h3>Don't have an account? <Link to='/SignupPage'>Sign Up</Link></h3>
                        <h3><Link to='/forgot-password' className="reset-password-link">Forgot Your Password? Update it</Link></h3>
                    </form>
                </div>
                <Footer /> {/* Ensure Footer component is included if necessary */}
              
            </div>
        </div>
    );
};

export default Login;
