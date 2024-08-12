import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaTachometerAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [houses, setHouses] = useState(0);
  const [owners, setOwners] = useState(0);
  const [users, setUsers] = useState(0); // Initialize users count to 0
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate the ticker effect
    let housesCount = 0;
    let ownersCount = 0;
    let usersCount = 0;

    const housesInterval = setInterval(() => {
      if (housesCount < 100) {
        housesCount += 1;
        setHouses(housesCount);
      } else {
        clearInterval(housesInterval);
      }
    }, 10); // Adjust speed by changing the interval

    const ownersInterval = setInterval(() => {
      if (ownersCount < 50) {
        ownersCount += 1;
        setOwners(ownersCount);
      } else {
        clearInterval(ownersInterval);
      }
    }, 30); // Adjust speed by changing the interval

    const usersInterval = setInterval(() => {
      if (usersCount < 150) {
        usersCount += 1;
        setUsers(usersCount);
      } else {
        clearInterval(usersInterval);
      }
    }, 20); // Adjust speed by changing the interval

    return () => {
      clearInterval(housesInterval);
      clearInterval(ownersInterval);
      clearInterval(usersInterval);
    };
  }, []);

  return (
    <div className='admin-body'>
      
      <div className="admin-dashboard-container">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-header">
            <h2>Habitat Hunt</h2>
          </div>  
          <nav className="admin-sidebar-nav">
            <ul>
              <li><i><FaTachometerAlt /></i> Dashboard</li>
              <li onClick={() => navigate("/adminusers")}><i className="fas fa-users"></i> Users</li>
              <li onClick={() => navigate("/adminowners")}><i className="fas fa-user-tie"></i> Owners</li>
            </ul>
          </nav>
          <div className="admin-logout">
            <Link to='/'> <i className="fas fa-sign-out-alt"></i> Logout</Link>
          </div>
        </aside>
        <main className="admin-main-content">
          <h1>Admin Dashboard</h1>
          <div className="admin-stats-container">
            <div className="admin-stats-card">
              <h3>{users}+ Users</h3>
              <p>Total number of registered users.</p>
            </div>
            <div className="admin-stats-card">
              <h3>{houses}+ Houses</h3>
              <p>Total number of available houses.</p>
            </div>
            <div className="admin-stats-card">
              <h3>{owners}+ Owners</h3>
              <p>Total number of registered owners.</p>
            </div>
          </div>
          <div className="admin-recent-activities">
            <h3>Recent Activities</h3>
            <div className="admin-activity-card">
              <i className="fas fa-user-plus"></i>
              <p>New Owner added: John Doe</p>
            </div>
            <div className="admin-activity-card">
              <i className="fas fa-home"></i>
              <p>House inspection scheduled: Next week</p>
            </div>
            <div className="admin-activity-card">
              <i className="fas fa-user-plus"></i>
              <p>New User registration: Jane Doe</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
