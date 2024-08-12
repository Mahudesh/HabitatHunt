import React, { useState } from 'react';
import '../Assets/Signup.css';
import Navbar from './Navbar';
import { FcGoogle } from "react-icons/fc";
import { BiLogoFacebookCircle } from "react-icons/bi";
import axios from 'axios';
import SlidingPanel from './SlidingPanel';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({   
        emailId: '',
        password: '',
        userName: '',
        phoneNumber: '',
        confirmPassword: ''
    });
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState('');
    const nav=useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = () => setIsChecked(!isChecked);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!isChecked) {
            setError('You must agree to the terms and conditions');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/auth/signup', {
                emailId: formData.emailId,
                password: formData.password,
                userName: formData.userName,
                phoneNumber: formData.phoneNumber
            });
            console.log("User registered", response.data);
            alert("Registration successful");
            nav('/Login');
        } catch (error) {
            console.error("There was an error registering the user", error);
            setError(error.response?.data || 'Registration failed');
        }
    };

    return (
        <div>
            <div className='signup-body'>
                <Navbar />
                <SlidingPanel />
                <div className="login-box">
                    <div className='signup-heading'>
                        <h2>SIGNUP</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="user-box">
                            <input 
                                type="text" 
                                name="userName" 
                                required 
                                value={formData.userName}
                                onChange={handleChange}
                            />
                            <label>Name</label>
                        </div>
                        <div className="user-box">
                            <input 
                                type="text" 
                                name="emailId" 
                                required 
                                value={formData.emailId}
                                onChange={handleChange}
                                pattern="^[^@]+@[^@]+\.[^@]+$" 
                                title="Please enter a valid email address" 
                            />
                            <label>Email</label>
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
                        <div className="user-box">
                            <input 
                                type="password" 
                                name="confirmPassword" 
                                required 
                                value={formData.confirmPassword} 
                                onChange={handleChange} 
                            />
                            <label>Confirm Password</label>
                        </div>
                        <div className="user-box">
                            <input 
                                type="tel" 
                                name="phoneNumber" 
                                maxLength="10" 
                                required 
                                className="phone-input" 
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                pattern="[0-9]{10}" 
                                title="Please enter a valid 10-digit phone number" 
                            />
                            <label>Phone Number</label>
                        </div>
                        <div className="checkbox-container">
                            <input 
                                type="checkbox" 
                                id="terms" 
                                checked={isChecked} 
                                onChange={handleCheckboxChange} 
                            />
                            <label htmlFor="terms">
                                I agree to HabitatHunt T&C, Privacy Policy.
                            </label>
                        </div>
                        {error && (
                            <h3 style={{ color: 'red', fontWeight: '20px' }}>{error}</h3>
                        )}
                        <br />
                        <div className="button-container">
                            <button 
                                className='submit' 
                                type="submit" 
                                disabled={!isChecked}  // Disable button if checkbox is not checked
                            >
                                Sign Up
                            </button>
                            <FcGoogle className="google-icon" />
                            <BiLogoFacebookCircle className='google-icon' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;