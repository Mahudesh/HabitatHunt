import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProperties } from './PropertyContext'; // Import the context
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import '../CityAssets/HouseDetailsCBE.css'; // Use a separate CSS file for Chennai styling
import { BsFillPersonLinesFill } from "react-icons/bs";

const HouseDetailsChe = () => {
  const { id } = useParams();
  const { properties } = useProperties();
  const property = properties.find((p) => p.id === parseInt(id));

  if (!property) {
    return <div>Property not found</div>;
  }

  const { image, additionalImages = [], overview = {}, owner = {} } = property;

  return (
    <div className='bg'>
      <Navbar />
      <div className="house-details-container">
        <div className="house-header">
          <div className="house-title">
            <h1>{property.bhk} BHK Independent House for Rent</h1>
            <p>Fully Furnished | {property.squareFeet} sq.ft</p>
            <p>{property.villageName}, {property.district}</p>
          </div>
          <div className="house-price">
            <h2>₹{property.price}</h2>
            <Link to='/Payment'>
              <button className="contact-owner">Contact Owner</button>
            </Link>
          </div>
        </div>
        <div className="house-images">
          <div className="additional-images">
            <h1>Additional Images</h1>
            <div className="image-gallery">
              {additionalImages.length > 0 ? (
                additionalImages.map((img, index) => (
                  <img key={index} src={img} alt={`Additional view ${index + 1}`} />
                ))
              ) : (
                <p>No additional images available.</p>
              )}
            </div>
          </div>
        </div>
        <div className="property-grid-container">
          <div className="property-overview-content">
            <h2>Overview Of Property</h2>
            <div className="overview-grid">
              <p><strong>Maintenance:</strong> {overview.maintenance || 'Not provided'}</p>
              <p><strong>Furnishing:</strong> {overview.furnishing || 'Not provided'}</p>
              <p><strong>Balcony:</strong> {overview.balcony || 'Not provided'}</p>
              <p><strong>Lease Type:</strong> {overview.leaseType || 'Not provided'}</p>
              <p><strong>Parking:</strong> {overview.parking || 'Not provided'}</p>
              <p><strong>Carpet Area:</strong> {overview.carpetArea || 'Not provided'}</p>
              <p><strong>Brokerage:</strong> {overview.brokerage || 'Not provided'}</p>
              <p><strong>Bathrooms:</strong> {overview.bathrooms || 'Not provided'}</p>
              <p><strong>Gas Pipeline:</strong> {overview.gaspipeline || 'Not provided'}</p>
              <p><strong>Price Negotiations:</strong> {overview.priceneg || 'Not provided'}</p>
            </div>
            <div className="contact-owner-wrapper">
              <Link to='/Payment'>
                <button className="contact-ownerdown">Contact Owner</button>
              </Link>
              <div className="owner-details">
                <BsFillPersonLinesFill className="owner-icon" />
                <b>Owner Name: </b>
                <span className="owner-name">{owner.name || 'Not available'}</span>
              </div>
            </div>  
          </div>
          <div className="property-grid">
            <h2>About This Property</h2>
            <p>{overview.about || 'No description available.'}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HouseDetailsChe;
