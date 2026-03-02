import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      {/* Simple Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold text-primary" to="/">
            <i className="bi bi-book me-2"></i>
            LibraryMS
          </Link>
          <div>
            <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-light py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Library Management System
              </h1>
              <p className="lead text-muted mb-4">
                A simple and efficient way to manage your college library. 
                Track books, manage members, and handle transactions easily.
              </p>
              <Link to="/register" className="btn btn-primary btn-lg px-4">
                Get Started
                <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>
            <div className="col-lg-6 text-center">
              {/* Big Book Icon instead of placeholder image */}
              <div className="book-icon-container">
                <i className="bi bi-journal-bookmark-fill text-primary" style={{ fontSize: '12rem' }}></i>
                <div className="mt-3">
                  <span className="badge bg-primary bg-opacity-10 text-primary p-3 rounded-pill">
                    <i className="bi bi-stack me-2"></i>
                    1000+ Books Available
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Key Features</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                    <i className="bi bi-search text-primary fs-3"></i>
                  </div>
                  <h5 className="card-title fw-bold">Search Books</h5>
                  <p className="card-text text-muted">Easy search by title, author, or category</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-success bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                    <i className="bi bi-arrow-left-right text-success fs-3"></i>
                  </div>
                  <h5 className="card-title fw-bold">Borrow/Return</h5>
                  <p className="card-text text-muted">Smooth book borrowing and return process</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-warning bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                    <i className="bi bi-clock-history text-warning fs-3"></i>
                  </div>
                  <h5 className="card-title fw-bold">Track Fines</h5>
                  <p className="card-text text-muted">Automatic fine calculation for late returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <p className="mb-0">© 2026 LibraryMS - Software Engineering Lab Project</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;