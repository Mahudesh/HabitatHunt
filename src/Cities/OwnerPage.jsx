import React, { useState, useEffect } from 'react';
import { useParams,Link, useNavigate} from 'react-router-dom';
import '../CityAssets/OwnerPage.css';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { IoPricetags } from "react-icons/io5";
import { LuBuilding2 } from "react-icons/lu";
import { FaUserGroup } from "react-icons/fa6";
import { LuSofa } from "react-icons/lu";
import { LandPlot } from 'lucide-react';
import { FaHome, FaTrash } from 'react-icons/fa'; // Import FaHome for the home icon
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../App'; // Import AuthContext

const OwnerPage = () => {
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [selectedBhk, setSelectedBhk] = useState(null);
    const [selectedFurnish, setSelectedFurnish] = useState(null);
    const [priceRange, setPriceRange] = useState([null, null]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [properties, setProperties] = useState([]);
    const [confirmPopup, setConfirmPopup] = useState(false);
    const [propertyToDelete, setPropertyToDelete] = useState(null);
    const { auth } = React.useContext(AuthContext); // Use context for authentication state

    const [cityId,setCityId]=useState('');
    const [cityName,setCityName]=useState('');
    const { ownerId } = useParams();
    const ownerName = localStorage.getItem('ownerName');

    useEffect(() => {
        const fetchCityId = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/owner/city/${ownerId}`);
                if (response.data && response.data.city) {
                    setCityId(response.data.city.cityId);
                    setCityName(response.data.city.cityName);
                }
            } catch (error) {
                console.error('Error fetching city data:', error);
            }
        };
        const fetchProperties = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/owner/properties/${ownerId}`);
                setProperties(response.data);
                const propertiesData = response.data;
                if (propertiesData.length > 0) {
                    setCityId(propertiesData[0].city.cityId); 
                    setCityName(propertiesData[0].city.cityName);
                } else {
                    fetchCityId();
                }
                const propertiesWithImages = await Promise.all(propertiesData.map(async (property) => {
                    const imageResponse = await axios.get(`http://localhost:8080/api/properties/property-image/${property.propertyId}`);
                    return { ...property, base64Image: imageResponse.data };
                }));
                setFilteredProperties(propertiesWithImages);
            } catch (error) {
                console.error("There was an error fetching properties", error);
            }
        };

        fetchProperties();
    }, [ownerId]);

    useEffect(() => {
        handleFilter(priceRange[0], priceRange[1], selectedBhk, selectedFurnish);
    }, [properties, priceRange, selectedBhk, selectedFurnish, sortOrder]);


    useEffect(() => {
        if (auth.isAuthenticated) {
            toast.success('Logged In As Owner');
        }
    }, [auth.isAuthenticated]);
    const handleFilter = (minPrice, maxPrice, bhk, furnish) => {
        let filtered = properties;

        if (minPrice !== null && maxPrice !== null) {
            filtered = filtered.filter(property => property.price >= minPrice && property.price <= maxPrice);
        }

        if (bhk !== null) {
            filtered = filtered.filter(property => property.bhk === bhk);
        }

        if (furnish !== null) {
            filtered = filtered.filter(property => property.furnish === furnish);
        }

        filtered.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);

        setFilteredProperties(filtered);
    };

    const handleAllCategories = () => {
        setSelectedBhk(null);
        setSelectedFurnish(null);
        setPriceRange([null, null]);
        handleFilter(null, null, null, null);
    };

    const handleSortByPrice = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        handleFilter(priceRange[0], priceRange[1], selectedBhk, selectedFurnish);
    };

    const handlePriceRangeClick = (min, max) => {
        setPriceRange([min, max]);
        handleFilter(min, max, selectedBhk, selectedFurnish);
    };

    const handleDelete = async (propertyId) => {
        setConfirmPopup(true);
        setPropertyToDelete(propertyId);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/properties/delete/${propertyToDelete}`);
            setProperties(properties.filter(property => property.propertyId !== propertyToDelete));
            toast.success('Property has been deleted successfully');
            setConfirmPopup(false);
        } catch (error) {
            console.error("There was an error deleting the property", error);
            toast.error('Error deleting property');
            setConfirmPopup(false);
        }
    };

    const cancelDelete = () => {
        setConfirmPopup(false);
    };
    const navigate = useNavigate(); // Initialize useNavigate
    
    const handleClick = () => {
        navigate(`/AddForm/${ownerId}/${cityId}`); // Pass the ownerId as a URL parameter
    };
    
    const getImagePath = (cityName) => {
        switch(cityName) {
            case 'Coimbatore':
                return '/CBEImages';
            case 'Chennai':
                return '/ChennaiImages';
            case 'Kanyakumari':
                return '/KKImages';
            case 'Madurai':
            return '/ChennaiImages';
            case 'Pondicherry':
            return '/KKImages';
            case 'Tanjore':
                return '/ChennaiImages';
            default:
                return '/DefaultImages';
        }
    };
    

    return (
        <div>
            <Navbar />
            <div className='ownerpage-body'>
                    <br></br>
                <div className='ownerpage-header'>
                    <h1 className='ownerpage-owner-name' style={{ paddingLeft: '250px' }}>Owner Name: {ownerName}</h1>
                </div>
                <br></br>
             <div className="property-container">
            <h1 className="property-heading">List of Properties You Have Posted for Sale in {cityName}!!</h1>
                <button className="add-property-button" onClick={handleClick}>
                    <FaHome className="home-icon" />
                    <span className="add-property-text">Add a New Property</span>
                </button>
        </div>
        <br></br>


                <div className='ownerpage-property-grid'>
                    {filteredProperties.length === 0 ? (
                        <h1>No Results Found</h1>
                    ) : (
                        filteredProperties.map(property => (
                            <div key={property.propertyId} className='ownerpage-property-card'>
                                <div className='ownerpage-property-image'>
                                <img
                                            src={`data:image/jpeg;base64,${property.base64Image}`}
                                            alt="House"
                                        />

                                </div>
                                <div className='ownerpage-property-details'>
                                    <p className='ownerpage-price'>
                                        <IoPricetags className='ownerpage-price-icon' />
                                        <span className='ownerpage-price-text'>Price: ₹{property.price}</span>
                                    </p>
                                    <p className='ownerpage-bhk'>
                                        <LuBuilding2 className='ownerpage-price-icon' />
                                        <span className='ownerpage-detail-text'>{property.bhk} BHK Independent House for rent in {property.villageName}, {property.district}</span>
                                    </p>
                                    <p className='ownerpage-square-feet'>
                                        <LandPlot className='ownerpage-price-icon' />
                                        <span className='ownerpage-detail-text'>Square feet: {property.squareFeet} ft</span>
                                    </p>
                                    <p className='ownerpage-furnished'>
                                        <LuSofa className='ownerpage-price-icon' />
                                        <span className='ownerpage-detail-text'>Furnished Type: {property.furnish}</span>
                                    </p>
                                    <p className='ownerpage-available-for'>
                                        <FaUserGroup className='ownerpage-price-icon' />
                                        <span className='ownerpage-detail-text'>Available for: {property.availableFor}</span>
                                    </p>
                                
                                    <div className='button-container'>
    <Link to={`/owner-house-details/${property.city.cityId}/${property.propertyId}`}>
        <button className='view-details'>
            View More Details
        </button>
    </Link>
    <button 
        className='remove-property'
        onClick={() => handleDelete(property.propertyId)}
    >
        <FaTrash className='remove-icon' />
        <span className='remove-text'>Remove The Property</span>
    </button>
</div>


                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Confirmation Popup */}
                {confirmPopup && (
                    <div className='confirm-popup'>
                        <div className='confirm-popup-content'>
                            <h2>Confirm Delete?</h2>
                            <div className='confirm-buttons'>
                                <button className='confirm-yes' onClick={confirmDelete}>Yes</button>
                                <button className='confirm-no' onClick={cancelDelete}>No</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
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
    );
};

export default OwnerPage;
