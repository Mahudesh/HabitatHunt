import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminUsers.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminOwners = () => {
    const [owners, setOwners] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showdelPopup,setshowdelPopup] = useState(false)
    const [ownerToDelete, setOwnerToDelete] = useState(null);
    const [newOwner, setNewOwner] = useState({
        ownerName: '',
        ownerEmail: '',
        ownerPhone: '',
        ownerPassword: '',
        city: { cityId: '' }
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOwners = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/owner/getallowners');
                setOwners(response.data);
            } catch (error) {
                console.error('Error fetching owner data:', error);
            }
        };

        fetchOwners();
    }, []);

    const handleDeleteClick = (ownerId) => {
        setOwnerToDelete(ownerId);
        setshowdelPopup(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/owner/delete/${ownerToDelete}`);
            setOwners(owners.filter(owner => owner.ownerId !== ownerToDelete));
            setshowdelPopup(false);
            toast.success('You have deleted the owner successfully!');
        } catch (error) {
            console.error('Error deleting owner:', error);
            toast.error('Error deleting owner.');
        }
    };

    const cancelDelete = () => {
        setshowdelPopup(false);
    };

    const handleAddNewOwner = () => {
        setShowPopup(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'cityId') {
            setNewOwner(prevState => ({
                ...prevState,
                city: { ...prevState.city, cityId: value }
            }));
        } else {
            setNewOwner(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const handleAddOwner = async () => {
        if (
            !newOwner.ownerName ||
            !newOwner.ownerEmail ||
            !newOwner.ownerPhone ||
            !newOwner.ownerPassword ||
            !newOwner.city.cityId
        ) {
            toast.error('Please fill in all required fields.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/api/owner/add', newOwner);
            setOwners([...owners, response.data]);
            setShowPopup(false);
            setNewOwner({
                ownerName: '',
                ownerEmail: '',
                ownerPhone: '',
                ownerPassword: '',
                city: { cityId: '' }
            });
            toast.success('New owner added successfully!');
        } catch (error) {
            console.error('Error adding new owner:', error);
            toast.error('Error adding new owner.');
        }
    };

    return (
        <div className='admin-body'>
            <div className="admin-dashboard-container">
                <aside className="admin-sidebar">
                    <div className="admin-sidebar-header">
                        <h2>Habitat Hunt</h2>
                    </div>
                    <nav className="admin-sidebar-nav">
                        <ul>
                            <li onClick={() => navigate("/admin")}><i className="fas fa-tachometer-alt"></i> Dashboard</li>
                            <li onClick={() => navigate("/adminusers")}><i className="fas fa-users"></i> Users</li> 
                            <li><i className="fas fa-user-tie"></i> Owners</li>
                            <li onClick={handleAddNewOwner}><i className='fas fa-plus'></i> Add New Owner</li>
                        </ul>
                    </nav>
                    <div className="admin-logout" onClick={() => navigate("/")}>
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </div>
                </aside>
                <main className="admin-main-content">
                    <div className='admin-heading'>
                        <h1>Authorized Owners In Habitat Hunt</h1>
                    </div>
                    <br />
                    <table className="admin-users-table">
                        <thead>
                            <tr>
                                <th>Owner ID</th>
                                <th>Owner Name</th>
                                <th>Owner Email</th>
                                <th>Owner's City ID</th>
                                <th>City Posted For Sale</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {owners.map(owner => (
                                <tr key={owner.ownerId}>
                                    <td>{owner.ownerId}</td>
                                    <td>{owner.ownerName}</td>
                                    <td>{owner.ownerEmail}</td>
                                    <td>{owner.city.cityId}</td>
                                    <td>{owner.city.cityName}</td>
                                    <td>
                                        <button 
                                            className="admin-button admin-delete-button" 
                                            onClick={() => handleDeleteClick(owner.ownerId)}
                                        >
                                            Delete Owner
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            </div>

            {/* Add New Owner Popup */}
            {showdelPopup && (
                <div className='confirm-popup'>
                    <div className='confirm-popup-content'>
                        <h2>Are you sure you want to delete this owner?</h2>
                        <div className='confirm-buttons'>
                            <button className='confirm-yes' onClick={confirmDelete}>Yes</button>
                            <button className='confirm-no' onClick={cancelDelete}>No</button>
                        </div>
                    </div>
                </div>
            )}

{showPopup && (
    <div className='popup-overlay'>
        <div className='popup-content'>
            <h2>Add New Owner in Habitat Hunt</h2>
            <div className='popup-input-group'>
                <input
                    type="text"
                    name="ownerName"
                    value={newOwner.ownerName}
                    onChange={handleInputChange}
                    placeholder="Enter Owner Name"
                    className="adminaddpopup-input"
                    required
                />
                <input
                    type="email"
                    name="ownerEmail"
                    value={newOwner.ownerEmail}
                    onChange={handleInputChange}
                    placeholder="Enter Owner Email"
                    className="adminaddpopup-input"
                    required
                />
                <input
                    type="text"
                    name="ownerPhone"
                    value={newOwner.ownerPhone}
                    onChange={handleInputChange}
                    placeholder="Enter Owner Phone"
                    className="adminaddpopup-input"
                    required
                />
                <input
                    type="password"
                    name="ownerPassword"
                    value={newOwner.ownerPassword}
                    onChange={handleInputChange}
                    placeholder="Enter Owner Password"
                    className="adminaddpopup-input"
                    required
                />
                <input
                    type="text"
                    name="cityId"
                    value={newOwner.city.cityId}
                    onChange={handleInputChange}
                    placeholder="Enter Owner's City ID"
                    className="adminaddpopup-input"
                    required
                />
            </div>
            <div className='popup-buttons'>
                <button className='popup-button add' onClick={handleAddOwner}>Add Owner</button>
                <button className='popup-button cancel' onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
        </div>
    </div>
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
    );
};

export default AdminOwners;
