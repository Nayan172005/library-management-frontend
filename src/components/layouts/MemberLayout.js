import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import './Layout.css';

function MemberLayout() {
  // You can get this from your auth context/state
  const userName = "John Doe";
  const userType = "member";

  return (
    <div className="layout">
      <Sidebar userType={userType} />
      <div className="main-content">
        <Header userType={userType} userName={userName} />
        <div className="content-wrapper">
          <div className="container-fluid py-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberLayout;