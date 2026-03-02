import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ userType }) {
  const location = useLocation();
  
  // Member menu items
  const memberMenu = [
    { path: '/member/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
    { path: '/member/search', icon: 'bi-search', label: 'Search Books' },
    { path: '/member/borrow-return', icon: 'bi-arrow-left-right', label: 'Borrow/Return' },
    { path: '/member/reservation', icon: 'bi-calendar-check', label: 'Reservations' },
    { path: '/member/loan-status', icon: 'bi-clock-history', label: 'Loan Status' },
    { path: '/member/fine-details', icon: 'bi-cash-stack', label: 'Fine Details' },
  ];

  // Librarian menu items
  const librarianMenu = [
    { path: '/librarian/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
    { path: '/librarian/manage-books', icon: 'bi-journal-bookmark-fill', label: 'Manage Books' },
    { path: '/librarian/manage-users', icon: 'bi-people-fill', label: 'Manage Users' },
    { path: '/librarian/approve-requests', icon: 'bi-check-circle-fill', label: 'Approve Requests' },
    { path: '/librarian/reports', icon: 'bi-graph-up', label: 'Reports' },
  ];

  const menuItems = userType === 'member' ? memberMenu : librarianMenu;

  return (
    <div className="sidebar bg-dark text-white">
      <div className="sidebar-header p-3">
        <h5 className="mb-0 text-center">
          <i className="bi bi-book-half me-2"></i>
          LibraryMS
        </h5>
      </div>
      <hr className="bg-white m-0" />
      <div className="sidebar-menu p-3">
        <ul className="nav nav-pills flex-column">
          {menuItems.map((item, index) => (
            <li className="nav-item mb-2" key={index}>
              <Link 
                to={item.path} 
                className={`nav-link text-white ${location.pathname === item.path ? 'active bg-primary' : ''}`}
              >
                <i className={`bi ${item.icon} me-3`}></i>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;