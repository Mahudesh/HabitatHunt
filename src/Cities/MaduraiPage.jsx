    import React, { useState, useEffect } from 'react';
    import { Link, useParams } from 'react-router-dom';
    import '../CityAssets/CityPage.css';
    import { useProperties } from './PropertyContext'; // Import the context
    import { IoPricetags } from "react-icons/io5";
    import { LuBuilding2 } from "react-icons/lu";
    import { FaUserGroup } from "react-icons/fa6";
    import { LuSofa } from "react-icons/lu";                    
    import { LandPlot } from 'lucide-react';
    import { FaFilter } from "react-icons/fa";

    import Navbar from '../Components/Navbar';
    import Footer from '../Components/Footer';
    import axios from 'axios';

    const MaduraiPage = () => {
        const [filteredProperties, setFilteredProperties] = useState([]);
        const [showMoreFilters, setShowMoreFilters] = useState(false);
        const [showBhkOptions, setShowBhkOptions] = useState(false);
        const [showFurnishedOptions, setShowFurnishedOptions] = useState(false);
        const [selectedBhk, setSelectedBhk] = useState(null);
        const [selectedFurnish, setSelectedFurnish] = useState(null);
        const [priceRange, setPriceRange] = useState([null, null]);
        const [sortOrder, setSortOrder] = useState('asc'); 

        const { properties, setProperties } = useProperties(); 
        const { cityId } = useParams(); 

        useEffect(() => {
            const fetchProperties = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/properties/city/getall/${cityId}`);
                    const propertiesData = response.data;

                    // Fetch images in parallel with properties data
                    const propertiesWithImages = await Promise.all(propertiesData.map(async (property) => {
                        try {
                            const imageResponse = await axios.get(`http://localhost:8080/api/properties/property-image/${property.propertyId}`);
                            return {
                                ...property,
                                base64Image: imageResponse.data,
                            };
                        } catch (error) {
                            console.error(`Error fetching image for property ${property.propertyId}:`, error);
                            return property; // Return property without image if there's an error
                        }
                    }));

                    setProperties(propertiesWithImages);
                    setFilteredProperties(propertiesWithImages);
                } catch (error) {
                    console.error("Error fetching properties:", error);
                }
            };
            fetchProperties();
        }, [cityId, setProperties]);

        useEffect(() => {
            handleFilter(priceRange[0], priceRange[1], selectedBhk, selectedFurnish);
        }, [properties, priceRange, selectedBhk, selectedFurnish, sortOrder]);

        const handleFilter = (minPrice, maxPrice, bhk, furnish) => {
            let filtered = [...properties]; 

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

        const handleMouseOverMoreFilters = () => {
            setShowMoreFilters(true);
        };

        const handleMouseLeaveMoreFilters = () => {
            setShowMoreFilters(false);
        };

        const handleMouseOverBhk = () => {
            setShowBhkOptions(true);
        };

        const handleMouseLeaveBhk = () => {
            setShowBhkOptions(false);
        };

        const handleMouseOverFurnished = () => {
            setShowFurnishedOptions(true);
        };

        const handleMouseLeaveFurnished = () => {
            setShowFurnishedOptions(false);
        };

        return (
            <div>
                <Navbar />
                <div className='cbe-body'>
                    <div className='coimbatore-page'>
                        <header className='header'>
                            <h1>Independent Houses for Rent in Madurai</h1>
                        </header>
                        <div className='filter-container'>
                            <div className='filter-buttons'>
                                <button onClick={handleAllCategories} className='filter-button'>All Categories</button>
                                <button onClick={handleSortByPrice} className='filter-button'>
                                    Sort By Price {sortOrder === 'asc' ? '↑' : '↓'}
                                </button>
                                <button onClick={() => handlePriceRangeClick(0, 10000)} className='filter-button'>₹0 - ₹10000</button>
                                <button onClick={() => handlePriceRangeClick(10001, 20000)} className='filter-button'>₹10001-₹20000</button>
                                <button onClick={() => handlePriceRangeClick(20001, 30000)} className='filter-button'>₹20001-₹30000</button>

                                <div
                                    className='more-filters'
                                    onMouseOver={handleMouseOverMoreFilters}
                                    onMouseLeave={handleMouseLeaveMoreFilters}
                                >
                                    <button className='filter-button'>More Filters <FaFilter /></button>
                                    {showMoreFilters && (
                                        <div className='dropdown'>
                                            <div
                                                className='dropdown-item'
                                                onMouseOver={handleMouseOverBhk}
                                                onMouseLeave={handleMouseLeaveBhk}
                                            >
                                                Filter by BHK
                                                {showBhkOptions && (
                                                    <div className='sub-dropdown'>
                                                        <div onClick={() => { setSelectedBhk(1); handleFilter(priceRange[0], priceRange[1], 1, selectedFurnish); }}>1 BHK</div>
                                                        <div onClick={() => { setSelectedBhk(2); handleFilter(priceRange[0], priceRange[1], 2, selectedFurnish); }}>2 BHK</div>
                                                        <div onClick={() => { setSelectedBhk(3); handleFilter(priceRange[0], priceRange[1], 3, selectedFurnish); }}>3 BHK</div>
                                                    </div>
                                                )}
                                            </div>
                                            <div
                                                className='dropdown-item'
                                                onMouseOver={handleMouseOverFurnished}
                                                onMouseLeave={handleMouseLeaveFurnished}
                                            >
                                                Filter by Furnished Type
                                                {showFurnishedOptions && (
                                                    <div className='sub-dropdown'>
                                                        <div onClick={() => { setSelectedFurnish('Furnished'); handleFilter(priceRange[0], priceRange[1], selectedBhk, 'Furnished'); }}>Furnished</div>
                                                        <div onClick={() => { setSelectedFurnish('Unfurnished'); handleFilter(priceRange[0], priceRange[1], selectedBhk, 'Unfurnished'); }}>Unfurnished</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='property-grid'>
                            {filteredProperties.length === 0 ? (
                                <h1>No Results Found</h1>
                            ) : (
                                filteredProperties.map(property => (
                                    <div key={property.propertyId} className='property-card'>
                                        <div className='property-image'>
                                            <img
                                                src={`data:image/jpeg;base64,${property.base64Image}`}
                                                alt="House"
                                            />
                                        </div>
                                        <div className='property-details'>
                                            <p className='price'>
                                                <IoPricetags className='price-icon' />
                                                <span className='price-text'>Price: ₹{property.price}</span>
                                            </p>
                                            <p className='bhk'>
                                                <LuBuilding2 className='price-icon' />
                                                <span className='detail-text'>{property.bhk} BHK Independent House for rent in {property.villageName}, {property.district}</span>
                                            </p>
                                            <p className='square-feet'>
                                                <LandPlot className='price-icon' />
                                                <span className='detail-text'>Square feet: {property.squareFeet} ft</span>
                                            </p>
                                            <p className='families'>
                                                <FaUserGroup className='price-icon' />
                                                <span className='detail-text'>Suitable for {property.availableFor}</span>
                                            </p>
                                            <p className='furnish'>
                                                <LuSofa className='price-icon' />
                                                <span className='detail-text'>Furnish Type: {property.furnish}</span>
                                            </p>
                                            <Link to={`/house-details/${property.city.cityId}/${property.propertyId}`} className='view-details'>
                                                View More Details
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    };

    export default MaduraiPage;
