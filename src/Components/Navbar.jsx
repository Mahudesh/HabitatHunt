import React, { useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import '../Assets/Navbar.css';
import { FaUser } from 'react-icons/fa'; // Import the user icon
import Logo from '../Assets/logo2.png'; // Import the logo image
import { AuthContext } from '../App'; // Import AuthContext

const Navbar = () => {
    const location = useLocation(); // Get the current location
    const { auth, handleLogout } = useContext(AuthContext); // Use context for authentication and logout
    const navigate = useNavigate(); // Use navigate for redirection

    const handleLogoutClick = () => {
        handleLogout(); 
        navigate('/'); 
    };

    // Determine whether to show the navigation links based on the current path
    const isOwnerPage = location.pathname.startsWith('/owner-page');
    const isOwnerDetailsPage = location.pathname.startsWith('/owner-house-details');
    const isAddFormPage = location.pathname.startsWith('/AddForm');
    const showNavLinks = !isOwnerPage && !isOwnerDetailsPage && !isAddFormPage && !['/Login', '/SignupPage', '/Ownerlogin'].includes(location.pathname);

    return (
        <nav className='navbar'>
            <div className='navbar-left'>
                <img src={Logo} alt="Habitat Hunt" className='navbar-logo' />
            </div>
            <div className='navbar-center'>
                {isOwnerPage || isOwnerDetailsPage || isAddFormPage ? (
                    <h1 className='navbar-heading'>Owner's Space</h1>
                ) : (
                    showNavLinks && (
                        <>
                            <Link to='/' className='navbar-link'>Home</Link>
                            <Link to='/AboutUsPage' className='navbar-link'>About</Link>
                            <Link to='/Pricing' className='navbar-link'>Pricing</Link>
                            <Link to={`/ContactForm/${auth.userId}`} className='navbar-link'>Contact</Link> {/* Pass the userId in the URL */}
                        </>
                    )
                )}
            </div>
            <div className='navbar-right'>
                {isOwnerPage || isOwnerDetailsPage || isAddFormPage ? (
                    <>
                        <div className='user-info'>
                            <FaUser className='user-icon' /> {/* User icon */}
                           <h3> <span className='welcome-message'>Welcome {auth.email}</span></h3>
                        </div>
                        <Link to='/Ownerlogin'>
                            <button className='navbar-button' onClick={handleLogoutClick}>Logout</button>
                        </Link>
                    </>
                ) : (
                    <>
                        {auth.isAuthenticated ? (
                            <>
                                <div className='user-info'>
                                    <FaUser className='user-icon' /> {/* User icon */}
                                    <span className='welcome-message'>Welcome {auth.email}</span>
                                </div>
                                <button className='navbar-button' onClick={handleLogoutClick}>Logout</button>
                            </>
                        ) : (
                            <>
                                {location.pathname === '/Login' && (
                                    <>
                                        <Link to='/SignupPage'>
                                            <button className='navbar-button'>Sign Up</button>
                                        </Link>
                                        <Link to='/Ownerlogin'>
                                            <button className='navbar-button'>Owner</button>
                                        </Link>
                                    </>
                                )}
                                {location.pathname === '/SignupPage' && (
                                    <Link to='/Login'>
                                        <button className='navbar-button'>Login</button>
                                    </Link>
                                )}
                                {location.pathname === '/adminlogin' && (
                                    <Link to='/Login'>
                                        <button className='navbar-button'>Login</button>
                                    </Link>
                                )}
                                {(location.pathname !== '/Login' && location.pathname !== '/SignupPage' && location.pathname !== '/adminlogin') && (
                                    <>
                                        <Link to='/Login'>
                                            <button className='navbar-button'>Login</button>
                                        </Link>
                                        <Link to='/SignupPage'>
                                            <button className='navbar-button'>Sign Up</button>
                                        </Link>
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
