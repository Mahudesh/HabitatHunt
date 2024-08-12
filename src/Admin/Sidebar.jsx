import React from 'react';
import './Sidebar.css'; // Ensure you have the correct path to your CSS
import { Link } from 'react-router-dom';
import { FaTachometerAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h2>Habitat Hunt</h2>
      </div>  
      <nav className="admin-sidebar-nav">
        <ul>
          <li><i><FaTachometerAlt/></i> Dashboard</li>
          <li><Link to="/adminusers" className="sidebar-link"><i className="fas fa-users"></i> Users</Link></li>
          <li><i className="fas fa-user-tie"></i> Owners</li>
        </ul>
      </nav>
      <div className="admin-logout">
        <Link to='/'>   <i className="fas fa-sign-out-alt"></i> Logout</Link>
      </div>
    </aside>
  );
};

export default Sidebar;
