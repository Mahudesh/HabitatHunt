// src/Pricing.js
import React from 'react';
import '../Assets/Pricing.css';
import Navbar from './Navbar';
import Footer from './Footer';
import price from'../Assets/Price.jpg'


const Pricing = () => {
  return (
    <div className="pricing-container">
      <Navbar />
      <div className="content">
        <div className="house-image1">
          <img src={price} alt="House" className="house-image-img1" />
          <div className="house-image-texte">
            <h1>No Extra Fees. Friendly Support</h1>
          </div>
        </div>
        <div className="pricing-section">
          <div className="pricing-card">
            <h2>Basic</h2>
            <p className="pricepage">1 BHK</p>
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </ul>
            <button className="pricing-button">Select</button>
          </div>
          <div className="pricing-card">
            <h2>Standard</h2>
            <p className="pricepage">2 BHK</p>
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
       
            </ul>
            <button className="pricing-button">Select</button>
          </div>
          <div className="pricing-card">
            <h2>Premium</h2>
            <p className="pricepage ">3 BHK</p>
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
          
            </ul>
            <button className="pricing-button">Select</button>
          </div>
        </div>
      </div>
      <Footer/> 
    </div>
  );
};

export default Pricing;