    import React, { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import '../Assets/LandingPage.css'; // Ensure this path is correct
    import Navbar from './Navbar';
    import Chennai from '../Assets/Chennai.jpg';
    import Kovai from '../Assets/Kovai.jpg';
    import KK from '../Assets/KK.jpg';
    import Madurai from '../Assets/Madurai.jpg';
    import Pondy from '../Assets/Pondy.jpg';
    import Tanjore from '../Assets/Tanjore.webp';
    import Banner1 from '../Assets/Banner.jpg'; // Add more banner images
    import Banner2 from '../Assets/Banner2.jpg'; // Add more banner images
    import Banner3 from '../Assets/Banner3.jpg'; // Add more banner images
    import Footer from './Footer';
    import ReviewCarousel from './ReviewCarousel';
    import { toast } from 'react-toastify';
import { AuthContext } from '../App'; // Import AuthContext
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

    const cities = [
        { id: 1, name: 'Coimbatore', image: Kovai ,link: '/CoimbatorePage' },
        { id: 2, name: 'Chennai', image: Chennai ,link: '/ChennaiPage'},
        { id: 3, name: 'KanyaKumari', image: KK ,link: '/Kanyakumaripage'},
        { id: 4, name: 'Madurai', image: Madurai ,link: '/MaduraiPage'},    
        { id: 5, name: 'Pondicherry', image: Pondy ,link:'/PondicherryPage'},  
        { id: 6, name: 'Tanjore', image: Tanjore ,link: '/TanjorePage'    }
    ];

    const bannerImages = [Banner3, Banner2, Banner1]; // Add your banner images here

    const LandingPage = () => {
        const [searchInput, setSearchInput] = useState('');
        const [currentImageIndex, setCurrentImageIndex] = useState(0);
        const { auth } = React.useContext(AuthContext); // Use context for authentication state

        const handleSearchChange = (e) =>
         {
            setSearchInput(e.target.value);
        };

        const handleSearchClick = () => {
            console.log(`Searching for: ${searchInput}`);
        };

        const filteredCities = cities.filter(city =>
            city.name.toLowerCase().includes(searchInput.toLowerCase())
        );  

        useEffect(() => {
            const interval = setInterval(() => {
                setCurrentImageIndex(prevIndex => (prevIndex + 1) % bannerImages.length);
            }, 2000); // Change image every 3 seconds

            return () => clearInterval(interval); // Cleanup interval on component unmount
        }, []);
        useEffect(() => {
            if (auth.isAuthenticated) {
                toast.success('Logged In As User');
            }
        }, [auth.isAuthenticated]);

        return (
            <div>
            <div className='landing-page'>
                <Navbar />
                <div className='content'>
                    <div className='house-image'>
                        <img src={bannerImages[currentImageIndex]} alt="House" className='house-image-img' />
                        <div className='house-image-text'>
                            <h1>Find A Home You Will Love!!</h1>
                            <p>Find new & featured property located in your city</p>
                        </div>
                    </div>
                    <div className='main-content'>
                        <h1 className='heading'>Choose Your Location</h1>
                        <div className='search-container'>
                            <input
                                type="text"
                                placeholder="Search for a city..."
                                value={searchInput}
                                onChange={handleSearchChange}
                                className='search-bar'
                            />
                            <button onClick={handleSearchClick} className='search-button'>
                                Search
                            </button>
                        </div>
                        <div className='city-grid'>
    {filteredCities.map((city) => (
        <Link key={city.id} to={`/city/${city.id}`} className='city-box'>
    <img src={city.image} alt={city.name} className='city-image' />
    <h2 className='city-name'>{city.name}</h2>
    </Link>
    
    ))}
    </div>
                        <ReviewCarousel/>
                    </div>
                </div>
            </div>
            <Footer/>
            <ToastContainer
position="top-center"
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

    export default LandingPage;
