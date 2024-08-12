import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../CityAssets/AddForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const AddForm = () => {
    const { ownerId, cityId } = useParams(); // Extract ownerId and cityId from URL

    const [formData, setFormData] = useState({
        city: cityId || '',
        owner: ownerId || '',
        price: '',
        bhk: '',
        squareFeet: '',
        furnish: '',
        availableFor: '',
        villageName: '',
        district: '',
        maintenance: '',
        balcony: '',
        leaseType: '',
        parking: '',
        carpetArea: '',
        brokerage: '',
        bathrooms: '',
        gaspipeline: '',
        priceneg: '',
        flooring: '',
        about: '',
        image: null
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            setFormData({
                ...formData,
                image: files[0]
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData();
        
        // Append all form data
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await axios.post('http://localhost:8080/api/properties/add', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success("Property added successfully!");
            setSubmitted(true);
        } catch (error) {
            console.error("There was an error adding the property", error);
            setError("There was an error adding the property");
            toast.error("Error adding property");
        }
    };
    return (
        <div>
        <div className='sell-us-bg'>
        <div className="sell-with-us-container">
            <Navbar/>
            <h1>Add a new Property</h1>
            <p>You can now list your property on Habitat Hunt and attract potential renters. We charge a 20% commission on all successful rentals.</p>
            {submitted ? (
                <div className="submission-message">
                    <p>Thank you for submitting your property details!.</p>
                    
                    
                </div>
            ) : (
                <form className="sell-with-us-form" onSubmit={handleSubmit}>
                    
                    <div className="form-row">
                        <div className="sell-with-us-form-group sell-with-us-price">
                            <strong><label><h3>Price*</h3></label></strong>
                            <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required />
                        </div>
                        <div className="sell-with-us-form-group sell-with-us-bhk">
                            <strong><label><h3>Type Of BHK*</h3></label></strong>
                            <label>
                                <input type="radio" name="bhk" value="1" checked={formData.bhk === "1"} onChange={handleChange} required /> 1BHK
                            </label>
                            <label>
                                <input type="radio" name="bhk" value="2" checked={formData.bhk === "2"} onChange={handleChange} /> 2BHK
                            </label>
                            <label>
                                <input type="radio" name="bhk" value="3" checked={formData.bhk === "3"} onChange={handleChange} /> 3BHK
                            </label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="sell-with-us-form-group sell-with-us-square-feet">
                            <strong><label><h3>Square Feet*</h3></label></strong>
                            <input type="number" name="squareFeet" value={formData.squareFeet} onChange={handleChange} required />
                        </div>
                        <div className="sell-with-us-form-group sell-with-us-furnish">
                            <strong><label><h3>Furnish Type*</h3></label></strong>
                            <div className="sell-with-us-radio-group">
                                <label>
                                    <input type="radio" name="furnish" value="Furnished" checked={formData.furnish === "Furnished"} onChange={handleChange} required /> Furnished
                                </label>
                                <label>
                                    <input type="radio" name="furnish" value="Unfurnished" checked={formData.furnish === "Unfurnished"} onChange={handleChange} /> Unfurnished
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="sell-with-us-form-group sell-with-us-available-for">
                            <strong><label><h3>Available For*</h3></label></strong>
                            <div className="sell-with-us-radio-group">
                                <label>
                                    <input type="radio" name="availableFor" value="Family" checked={formData.availableFor === "Family"} onChange={handleChange} required /> Family
                                </label>
                                <label>
                                    <input type="radio" name="availableFor" value="Family & Bachelor" checked={formData.availableFor === "Family & Bachelor"} onChange={handleChange} /> Family & Bachelor
                                </label>
                            </div>
                        </div>
                        <div className="sell-with-us-form-group sell-with-us-village-name">
                            <strong><label><h3>Village Name*</h3></label></strong>
                            <input type="text" name="villageName" value={formData.villageName} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="sell-with-us-form-group sell-with-us-district">
                            <strong><label><h3>District*</h3></label></strong>
                            <label>
                                <input type="radio" name="district" value="Coimbatore" checked={formData.district === "Coimbatore"} onChange={handleChange} required /> Coimbatore
                            </label>
                            <label>
                                <input type="radio" name="district" value="Chennai" checked={formData.district === "Chennai"} onChange={handleChange} /> Chennai
                            </label>
                            <label>
                                <input type="radio" name="district" value="KanyaKumari" checked={formData.district === "KanyaKumari"} onChange={handleChange} /> KanyaKumari
                            </label>
                            <label>
                                <input type="radio" name="district" value="Madurai" checked={formData.district === "Madurai"} onChange={handleChange} /> Madurai
                            </label>
                            <label>
                                <input type="radio" name="district" value="Pondicherry" checked={formData.district === "Pondicherry"} onChange={handleChange} /> Pondicherry
                            </label>
                            <label>
                                <input type="radio" name="district" value="Tanjore" checked={formData.district === "Tanjore"} onChange={handleChange} /> Tanjore
                            </label>
                        </div>
                        <div className="sell-with-us-form-group sell-with-us-maintenance">
                            <strong><label><h3>Maintenance*</h3></label></strong>
                            <div className="sell-with-us-radio-group">
                                <label>
                                    <input type="radio" name="maintenance" value="Monthly" checked={formData.maintenance === "Monthly"} onChange={handleChange} required /> Monthly
                                </label>
                                <label>
                                    <input type="radio" name="maintenance" value="Quarterly" checked={formData.maintenance === "Quarterly"} onChange={handleChange} /> Quarterly
                                </label>
                                <label>
                                    <input type="radio" name="maintenance" value="Yearly" checked={formData.maintenance === "Yearly"} onChange={handleChange} /> Yearly
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="sell-with-us-form-group sell-with-us-balcony">
                            <strong><label><h3>Balcony*</h3></label></strong>
                            <label>
                                <input type="radio" name="balcony" value="Yes" checked={formData.balcony === "Yes"} onChange={handleChange} required /> Yes
                            </label>
                            <label>
                                <input type="radio" name="balcony" value="No" checked={formData.balcony === "No"} onChange={handleChange} /> No
                            </label>
                        </div>
                        <div className="sell-with-us-form-group sell-with-us-lease-type">
                            <strong><label><h3>Lease Type*</h3></label></strong>
                            <div className="sell-with-us-radio-group">
                                <label>
                                    <input type="radio" name="leaseType" value="Rental" checked={formData.leaseType === "Rental"} onChange={handleChange} required /> Rental
                                </label>
                                <label>
                                    <input type="radio" name="leaseType" value="Long Term" checked={formData.leaseType === "Long Term"} onChange={handleChange} /> Long Term
                                </label>
                                <label>
                                    <input type="radio" name="leaseType" value="Short Term" checked={formData.leaseType === "Short Term"} onChange={handleChange} /> Short Term
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="sell-with-us-form-group sell-with-us-parking">
                            <strong><label><h3>Parking*</h3></label></strong>
                            <label>
                                <input type="radio" name="parking" value="Yes" checked={formData.parking === "Yes"} onChange={handleChange} required /> Yes
                            </label>
                            <label>
                                <input type="radio" name="parking" value="No" checked={formData.parking === "No"} onChange={handleChange} /> No
                            </label>
                        </div>
                        <div className="sell-with-us-form-group sell-with-us-carpet-area">
                            <strong><label><h3>Carpet Area*</h3></label></strong>
                            <input type="text" name="carpetArea" value={formData.carpetArea} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="sell-with-us-form-group sell-with-us-brokerage">
                            <strong><label><h3>Brokerage Fee*</h3></label></strong>
                            <label>
                                <input type="radio" name="brokerage" value="Yes" checked={formData.brokerage === "Yes"} onChange={handleChange} required /> Yes
                            </label>
                            <label>
                                <input type="radio" name="brokerage" value="No" checked={formData.brokerage === "No"} onChange={handleChange} /> No
                            </label>
                         
                        </div>
                        <div className="sell-with-us-form-group sell-with-us-bathrooms">
                            <strong><label><h3>Bathrooms*</h3></label></strong>
                            <label>
                                            <input type="radio" name="bathrooms" value="1" checked={formData.bathrooms === "1"} onChange={handleChange} required /> 1
                                        </label>
                                        <label>
                                            <input type="radio" name="bathrooms" value="2" checked={formData.bathrooms === "2"} onChange={handleChange} /> 2
                                        </label>
                                        <label>
                                            <input type="radio" name="bathrooms" value="3" checked={formData.bathrooms === "3"} onChange={handleChange} /> 3
                                        </label>

                        </div>
                    </div>
                    <div className="form-row">
                        <div className="sell-with-us-form-group sell-with-us-gaspipeline">
                            <strong><label><h3>Gas Pipeline*</h3></label></strong>
                            <label>
                                <input type="radio" name="gaspipeline" value="Yes" checked={formData.gaspipeline === "Yes"} onChange={handleChange} required /> Yes
                            </label>
                            <label>
                                <input type="radio" name="gaspipeline" value="No" checked={formData.gaspipeline === "No"} onChange={handleChange} /> No
                            </label>
                        </div>
                        <div className="sell-with-us-form-group sell-with-us-priceneg">
                            <strong><label><h3>Price Negotiable*</h3></label></strong>
                            <label>
                                <input type="radio" name="priceneg" value="Yes" checked={formData.priceneg === "Yes"} onChange={handleChange} required /> Yes
                            </label>
                            <label>
                                <input type="radio" name="priceneg" value="No" checked={formData.priceneg === "No"} onChange={handleChange} /> No
                            </label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="sell-with-us-form-group sell-with-us-flooring">
                            <strong><label><h3>Flooring Type*</h3></label></strong>
                            <input type="text" name="flooring" value={formData.flooring} onChange={handleChange} required />
                        </div>
                        <div className="sell-with-us-form-group sell-with-us-about">
                            <strong><label><h3>About*</h3></label></strong>
                            <textarea name="about" value={formData.about} onChange={handleChange} required></textarea>
                        </div>
                    </div>
                      <div className="form-row">
                <div className="sell-with-us-form-group sell-with-us-upload-front">
                <strong><label><h3>Upload Front Pictures of the Property*</h3></label></strong>
                                    <input type="file" name="image" className="sell-with-us-file-input" onChange={handleChange} required />
                </div>
               
            </div> 

                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="sell-with-us-submit-button">Submit</button>

                </form>
                
            )}
             <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"   
            />
      
        </div>
    
        </div>
        
        </div>
    );
};

export default AddForm;