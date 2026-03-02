import React, { useState } from 'react';

function FineDetails() {
  // Sample fine data
  const [fines] = useState([
    { 
      id: 'F001', 
      loanId: 'L001', 
      book: 'Introduction to Algorithms', 
      dueDate: '2026-02-15', 
      returnDate: '2026-02-20', 
      daysLate: 5, 
      fineAmount: 25,
      status: 'Unpaid'
    },
    { 
      id: 'F002', 
      loanId: 'L003', 
      book: 'Database Management Systems', 
      dueDate: '2026-02-10', 
      returnDate: '2026-02-18', 
      daysLate: 8, 
      fineAmount: 40,
      status: 'Unpaid'
    },
    { 
      id: 'F003', 
      loanId: 'L005', 
      book: 'The Great Gatsby', 
      dueDate: '2026-02-05', 
      returnDate: '2026-02-05', 
      daysLate: 0, 
      fineAmount: 0,
      status: 'Paid'
    },
    { 
      id: 'F004', 
      loanId: 'L007', 
      book: 'Clean Code', 
      dueDate: '2026-02-25', 
      returnDate: '2026-03-01', 
      daysLate: 4, 
      fineAmount: 20,
      status: 'Unpaid'
    },
    { 
      id: 'F005', 
      loanId: 'L009', 
      book: 'The Hobbit', 
      dueDate: '2026-01-30', 
      returnDate: '2026-02-10', 
      daysLate: 11, 
      fineAmount: 55,
      status: 'Unpaid'
    },
  ]);

  const [filter, setFilter] = useState('All');

  // Calculate total fine
  const totalFine = fines
    .filter(fine => fine.status === 'Unpaid')
    .reduce((sum, fine) => sum + fine.fineAmount, 0);

  // Filter fines based on status
  const filteredFines = filter === 'All' 
    ? fines 
    : fines.filter(fine => fine.status === filter);

  // Handle payment
  const handlePayFine = (fineId) => {
    alert(`Processing payment for Fine ID: ${fineId}`);
    // In real implementation, this would call an API
  };

  return (
    <div className="fine-details-page">
      <h2 className="mb-4">💰 Fine Details</h2>

      {/* Fine Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-2">Total Fine Due</h6>
                  <h2 className="mb-0">₹{totalFine}</h2>
                </div>
                <i className="bi bi-exclamation-triangle-fill fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-warning text-dark">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-2">Unpaid Fines</h6>
                  <h2 className="mb-0">{fines.filter(f => f.status === 'Unpaid').length}</h2>
                </div>
                <i className="bi bi-clock-history fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-2">Paid Fines</h6>
                  <h2 className="mb-0">{fines.filter(f => f.status === 'Paid').length}</h2>
                </div>
                <i className="bi bi-check-circle-fill fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <label className="form-label fw-semibold">Filter by Status</label>
              <select 
                className="form-select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All Fines</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Fines Table */}
      <div className="card shadow-sm">
        <div className="card-header bg-white">
          <h5 className="mb-0">Fine History</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th>Fine ID</th>
                <th>Loan ID</th>
                <th>Book Title</th>
                <th>Due Date</th>
                <th>Return Date</th>
                <th>Days Late</th>
                <th>Fine Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFines.length > 0 ? (
                filteredFines.map((fine) => (
                  <tr key={fine.id}>
                    <td className="fw-semibold">{fine.id}</td>
                    <td>{fine.loanId}</td>
                    <td>{fine.book}</td>
                    <td>{fine.dueDate}</td>
                    <td>{fine.returnDate}</td>
                    <td>
                      {fine.daysLate > 0 ? (
                        <span className="badge bg-danger">{fine.daysLate} days</span>
                      ) : (
                        <span className="badge bg-success">On time</span>
                      )}
                    </td>
                    <td className={fine.fineAmount > 0 ? 'fw-bold text-danger' : ''}>
                      ₹{fine.fineAmount}
                    </td>
                    <td>
                      <span className={`badge ${fine.status === 'Paid' ? 'bg-success' : 'bg-warning text-dark'}`}>
                        {fine.status}
                      </span>
                    </td>
                    <td>
                      {fine.status === 'Unpaid' && fine.fineAmount > 0 ? (
                        <button 
                          className="btn btn-sm btn-primary"
                          onClick={() => handlePayFine(fine.id)}
                        >
                          <i className="bi bi-credit-card me-1"></i>
                          Pay Now
                        </button>
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-5">
                    <i className="bi bi-emoji-smile fs-1 text-muted d-block mb-3"></i>
                    <h5 className="text-muted">No fines found</h5>
                    <p className="text-muted mb-0">You have no {filter.toLowerCase()} fines</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="card-footer bg-white">
          <small className="text-muted">
            * Fine is calculated as ₹5 per day for late returns
          </small>
        </div>
      </div>
    </div>
  );
}

export default FineDetails;