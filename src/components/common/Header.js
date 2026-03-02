import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ userType, userName }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm header">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <i className="bi bi-list fs-3 me-3 d-lg-none" 
             style={{ cursor: 'pointer' }}
             onClick={() => document.body.classList.toggle('sidebar-toggled')}>
          </i>
          <span className="navbar-brand fw-bold text-primary">
            Library Management System
          </span>
        </div>
        
        <div className="d-flex align-items-center">
          <div className="me-3 text-end">
            <div className="fw-semibold">{userName || 'User'}</div>
            <small className="text-muted text-capitalize">{userType}</small>
          </div>
          <div className="dropdown">
            <button 
              className="btn btn-light rounded-circle p-2" 
              type="button" 
              data-bs-toggle="dropdown"
              style={{ width: '40px', height: '40px' }}
            >
              <i className="bi bi-person-circle fs-4"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><a className="dropdown-item" href="#"><i className="bi bi-person me-2"></i>Profile</a></li>
              <li><a className="dropdown-item" href="#"><i className="bi bi-gear me-2"></i>Settings</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item text-danger" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;