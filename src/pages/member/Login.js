import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ setUser }) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    userType: 'member'
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo login - replace with actual authentication
    if (credentials.userType === 'member') {
      setUser({ type: 'member', name: credentials.username });
      navigate('/member/dashboard');
    } else {
      setUser({ type: 'librarian', name: credentials.username });
      navigate('/librarian/dashboard');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center min-vh-100 align-items-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">
              {/* Header */}
              <div className="text-center mb-4">
                <Link to="/" className="text-decoration-none">
                  <h3 className="fw-bold text-primary">
                    <i className="bi bi-book me-2"></i>
                    LibraryMS
                  </h3>
                </Link>
                <p className="text-muted mt-2">Login to your account</p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit}>
                {/* User Type Selection */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Login as</label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="userType"
                        id="member"
                        value="member"
                        checked={credentials.userType === 'member'}
                        onChange={(e) => setCredentials({...credentials, userType: e.target.value})}
                      />
                      <label className="form-check-label" htmlFor="member">
                        Member
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="userType"
                        id="librarian"
                        value="librarian"
                        checked={credentials.userType === 'librarian'}
                        onChange={(e) => setCredentials({...credentials, userType: e.target.value})}
                      />
                      <label className="form-check-label" htmlFor="librarian">
                        Librarian
                      </label>
                    </div>
                  </div>
                </div>

                {/* Username */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter username"
                    value={credentials.username}
                    onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    required
                  />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100 py-2 mb-3">
                  Login
                </button>

                {/* Demo Credentials */}
                <div className="bg-light p-3 rounded">
                  <p className="small text-muted mb-2">
                    <i className="bi bi-info-circle me-1"></i>
                    Demo Credentials:
                  </p>
                  <div className="row small">
                    <div className="col-6">
                      <strong>Member:</strong> member@test.com / 123
                    </div>
                    <div className="col-6">
                      <strong>Librarian:</strong> admin@test.com / 123
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;