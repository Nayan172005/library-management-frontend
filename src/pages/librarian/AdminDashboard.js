import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const stats = {
    totalBooks: 1250,
    totalMembers: 350,
    activeLoans: 45,
    pendingRequests: 12
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Librarian Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h6>Total Books</h6>
              <h3>{stats.totalBooks}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h6>Total Members</h6>
              <h3>{stats.totalMembers}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h6>Active Loans</h6>
              <h3>{stats.activeLoans}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <h6>Pending Requests</h6>
              <h3>{stats.pendingRequests}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Management Links */}
      <div className="row">
        <div className="col-md-4 mb-3">
          <Link to="/librarian/manage-books" className="text-decoration-none">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <i className="bi bi-journal-bookmark-fill fs-1 text-primary mb-3"></i>
                <h5>Manage Books</h5>
                <p className="text-muted">Add, update, or remove books</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 mb-3">
          <Link to="/librarian/manage-users" className="text-decoration-none">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <i className="bi bi-people-fill fs-1 text-success mb-3"></i>
                <h5>Manage Users</h5>
                <p className="text-muted">View and manage library members</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 mb-3">
          <Link to="/librarian/approve-requests" className="text-decoration-none">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <i className="bi bi-check-circle-fill fs-1 text-warning mb-3"></i>
                <h5>Approve Requests</h5>
                <p className="text-muted">Manage issue/return requests</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;