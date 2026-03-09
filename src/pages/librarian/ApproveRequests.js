import React, { useState } from 'react';

function ApproveRequests() {
  // Sample request data
  const [requests, setRequests] = useState({
    borrow: [
      { 
        id: 'BR001', 
        userId: 'U003',
        userName: 'John Doe',
        bookId: 'B001',
        bookTitle: 'Introduction to Algorithms',
        requestDate: '2026-02-28',
        expectedReturn: '2026-03-14',
        status: 'Pending'
      },
      { 
        id: 'BR002', 
        userId: 'U005',
        userName: 'Alice Brown',
        bookId: 'B004',
        bookTitle: 'The Great Gatsby',
        requestDate: '2026-02-28',
        expectedReturn: '2026-03-14',
        status: 'Pending'
      },
      { 
        id: 'BR003', 
        userId: 'U007',
        userName: 'Charlie Wilson',
        bookId: 'B002',
        bookTitle: 'Database Management Systems',
        requestDate: '2026-02-27',
        expectedReturn: '2026-03-13',
        status: 'Approved'
      },
      { 
        id: 'BR004', 
        userId: 'U004',
        userName: 'Bob Johnson',
        bookId: 'B006',
        bookTitle: 'A Brief History of Time',
        requestDate: '2026-02-26',
        expectedReturn: '2026-03-12',
        status: 'Rejected'
      },
    ],
    return: [
      {
        id: 'RT001',
        userId: 'U003',
        userName: 'John Doe',
        bookId: 'B003',
        bookTitle: 'Software Engineering',
        borrowDate: '2026-02-15',
        returnDate: '2026-02-28',
        fine: 0,
        status: 'Pending'
      },
      {
        id: 'RT002',
        userId: 'U005',
        userName: 'Alice Brown',
        bookId: 'B005',
        bookTitle: 'Clean Code',
        borrowDate: '2026-02-10',
        returnDate: '2026-02-28',
        fine: 40,
        status: 'Pending'
      },
      {
        id: 'RT003',
        userId: 'U002',
        userName: 'Jane Smith',
        bookId: 'B007',
        bookTitle: 'The Art of Computer Programming',
        borrowDate: '2026-02-01',
        returnDate: '2026-02-28',
        fine: 85,
        status: 'Pending'
      },
    ]
  });

  const [activeTab, setActiveTab] = useState('borrow');
  const [filter, setFilter] = useState('All');

  // Handle approve request
  const handleApprove = (requestId, type) => {
    if (window.confirm('Approve this request?')) {
      if (type === 'borrow') {
        setRequests({
          ...requests,
          borrow: requests.borrow.map(req => 
            req.id === requestId ? {...req, status: 'Approved'} : req
          )
        });
      } else {
        setRequests({
          ...requests,
          return: requests.return.map(req => 
            req.id === requestId ? {...req, status: 'Approved'} : req
          )
        });
      }
      alert('Request approved successfully!');
    }
  };

  // Handle reject request
  const handleReject = (requestId, type) => {
    if (window.confirm('Reject this request?')) {
      if (type === 'borrow') {
        setRequests({
          ...requests,
          borrow: requests.borrow.map(req => 
            req.id === requestId ? {...req, status: 'Rejected'} : req
          )
        });
      } else {
        setRequests({
          ...requests,
          return: requests.return.map(req => 
            req.id === requestId ? {...req, status: 'Rejected'} : req
          )
        });
      }
      alert('Request rejected!');
    }
  };

  // Filter requests based on status
  const getFilteredRequests = (type) => {
    const data = type === 'borrow' ? requests.borrow : requests.return;
    if (filter === 'All') return data;
    return data.filter(req => req.status === filter);
  };

  // Calculate statistics
  const stats = {
    pendingBorrow: requests.borrow.filter(r => r.status === 'Pending').length,
    pendingReturn: requests.return.filter(r => r.status === 'Pending').length,
    totalFine: requests.return
      .filter(r => r.status === 'Pending')
      .reduce((sum, r) => sum + (r.fine || 0), 0)
  };

  return (
    <div className="approve-requests-page">
      <h2 className="mb-4">Approve Requests</h2>

      {/* Statistics Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-2">Pending Borrow</h6>
                  <h2 className="mb-0">{stats.pendingBorrow}</h2>
                </div>
                <i className="bi bi-bookmark-plus fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-warning text-dark">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-2">Pending Returns</h6>
                  <h2 className="mb-0">{stats.pendingReturn}</h2>
                </div>
                <i className="bi bi-arrow-return-left fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-2">Total Fine to Collect</h6>
                  <h2 className="mb-0">₹{stats.totalFine}</h2>
                </div>
                <i className="bi bi-cash-stack fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card shadow-sm">
        <div className="card-header bg-white">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'borrow' ? 'active' : ''}`}
                onClick={() => setActiveTab('borrow')}
              >
                <i className="bi bi-bookmark-plus me-2"></i>
                Borrow Requests
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'return' ? 'active' : ''}`}
                onClick={() => setActiveTab('return')}
              >
                <i className="bi bi-arrow-return-left me-2"></i>
                Return Requests
              </button>
            </li>
          </ul>
        </div>

        <div className="card-body">
          {/* Filter */}
          <div className="row mb-3">
            <div className="col-md-4">
              <select 
                className="form-select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All Requests</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Borrow Requests Table */}
          {activeTab === 'borrow' && (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="bg-light">
                  <tr>
                    <th>Request ID</th>
                    <th>Member</th>
                    <th>Book</th>
                    <th>Request Date</th>
                    <th>Expected Return</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredRequests('borrow').length > 0 ? (
                    getFilteredRequests('borrow').map((req) => (
                      <tr key={req.id}>
                        <td className="fw-semibold">{req.id}</td>
                        <td>
                          <div>
                            <span className="fw-semibold">{req.userName}</span>
                            <div><small className="text-muted">ID: {req.userId}</small></div>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span>{req.bookTitle}</span>
                            <div><small className="text-muted">ID: {req.bookId}</small></div>
                          </div>
                        </td>
                        <td>{req.requestDate}</td>
                        <td>{req.expectedReturn}</td>
                        <td>
                          <span className={`badge ${
                            req.status === 'Pending' ? 'bg-warning text-dark' :
                            req.status === 'Approved' ? 'bg-success' :
                            'bg-danger'
                          }`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="text-center">
                          {req.status === 'Pending' && (
                            <div className="d-flex justify-content-center gap-2">
                              <button 
                                className="btn btn-sm btn-success"
                                onClick={() => handleApprove(req.id, 'borrow')}
                                title="Approve request"
                              >
                                <i className="bi bi-check-lg"></i>
                              </button>
                              <button 
                                className="btn btn-sm btn-danger"
                                onClick={() => handleReject(req.id, 'borrow')}
                                title="Reject request"
                              >
                                <i className="bi bi-x-lg"></i>
                              </button>
                            </div>
                          )}
                          {req.status !== 'Pending' && (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        <p className="text-muted mb-0">No borrow requests found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Return Requests Table */}
          {activeTab === 'return' && (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="bg-light">
                  <tr>
                    <th>Request ID</th>
                    <th>Member</th>
                    <th>Book</th>
                    <th>Borrow Date</th>
                    <th>Return Date</th>
                    <th>Fine</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredRequests('return').length > 0 ? (
                    getFilteredRequests('return').map((req) => (
                      <tr key={req.id}>
                        <td className="fw-semibold">{req.id}</td>
                        <td>
                          <div>
                            <span className="fw-semibold">{req.userName}</span>
                            <div><small className="text-muted">ID: {req.userId}</small></div>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span>{req.bookTitle}</span>
                            <div><small className="text-muted">ID: {req.bookId}</small></div>
                          </div>
                        </td>
                        <td>{req.borrowDate}</td>
                        <td>{req.returnDate}</td>
                        <td>
                          {req.fine > 0 ? (
                            <span className="fw-bold text-danger">₹{req.fine}</span>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                        <td>
                          <span className={`badge ${
                            req.status === 'Pending' ? 'bg-warning text-dark' :
                            req.status === 'Approved' ? 'bg-success' :
                            'bg-danger'
                          }`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="text-center">
                          {req.status === 'Pending' && (
                            <div className="d-flex justify-content-center gap-2">
                              <button 
                                className="btn btn-sm btn-success"
                                onClick={() => handleApprove(req.id, 'return')}
                                title="Approve return"
                              >
                                <i className="bi bi-check-lg"></i>
                              </button>
                              <button 
                                className="btn btn-sm btn-danger"
                                onClick={() => handleReject(req.id, 'return')}
                                title="Reject return"
                              >
                                <i className="bi bi-x-lg"></i>
                              </button>
                            </div>
                          )}
                          {req.status !== 'Pending' && (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-4">
                        <p className="text-muted mb-0">No return requests found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ApproveRequests;