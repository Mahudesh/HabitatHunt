import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams,useNavigate} from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import '../CityAssets/HouseDetailsCBE.css';
import { BsFillPersonLinesFill } from "react-icons/bs";
import axios from 'axios';
import { AuthContext } from '../App'; // Import AuthContext
import addcbe1 from '../CBEImages/addcbe1.jpg';
import addcbe2 from '../CBEImages/addcbe2.webp';
import addcbe3 from '../CBEImages/addcbe3.jpg';
import addcbe4 from '../CBEImages/addcbe4.webp';
import addcbe5 from '../CBEImages/addcbe5.jpg';
import addcbe6 from '../CBEImages/addcbe6.jpg';
import addcbe7 from '../CBEImages/addcbe7.jpg';
import addcbe8 from '../CBEImages/addcbe8.jpg';

const HouseDetailsCBE = () => {
  const { cityId, propertyId } = useParams();
  const { auth } = useContext(AuthContext); // Use context for authentication state
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoginPopup, setShowLoginPopup] = useState(false); // State to manage popup visibility
  const navigate=useNavigate();

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/properties/city/${cityId}/${propertyId}`);
        setProperty(response.data);
      } catch (error) {
        console.error("There was an error fetching the property details!", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [cityId, propertyId]); // Fetch details when cityId or propertyId changes

  const handleContactOwnerClick = () => {
    if (!auth.isAuthenticated) {
      setShowLoginPopup(true); // Show popup if not logged in
    }
    else{
      navigate('/Payment')
    }
  };

  const closePopup = () => {
    setShowLoginPopup(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!property) {
    return <p>Property Not Found</p>;
  }

  const additionalImages = [
    addcbe1,
    addcbe2,
    addcbe3,
    addcbe4,
    addcbe5,
    addcbe6,
    addcbe7,
    addcbe8,
  ];

  return (
    <div>
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
            <button className="contact-owner" onClick={handleContactOwnerClick}>
              Contact Owner
            </button>
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
              <p><strong>Maintenance:</strong> {property.maintenance || 'Not provided'}</p>
              <p><strong>Balcony:</strong> {property.balcony || 'Not provided'}</p>
              <p><strong>Lease Type:</strong> {property.leaseType || 'Not provided'}</p>
              <p><strong>Parking:</strong> {property.parking || 'Not provided'}</p>
              <p><strong>Carpet Area:</strong> {property.carpetArea || 'Not provided'}</p>
              <p><strong>Brokerage:</strong> {property.brokerage || 'Not provided'}</p>
              <p><strong>Bathrooms:</strong> {property.bathrooms || 'Not provided'}</p>
              <p><strong>Gas Pipeline:</strong> {property.gaspipeline || 'Not provided'}</p>
              <p><strong>Price Negotiations:</strong> {property.priceneg || 'Not provided'}</p>
            </div>
            <div className="contact-owner-wrapper">
              <button className="contact-ownerdown" onClick={handleContactOwnerClick}>
                Contact Owner
              </button>
              <div className="owner-details">
                <BsFillPersonLinesFill className="owner-icon" />
                <b>Owner Name: </b>
                <span className="owner-name">{property.owner.ownerName || 'Not available'}</span>
              </div>
            </div>  
          </div>
          <div className="property-grid">
            <h2>About This Property</h2>
            <p>{property.about || 'No description available.'}</p>
          </div>
        </div>
      </div>
      <Footer />
      
      {/* Popup for login */}
      {showLoginPopup && (
        <div className="login-popup">
          <div className="popup-content">
            <h2>Kindly Login To Proceed!!</h2>
            <button onClick={closePopup} className="popup-close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HouseDetailsCBE;
