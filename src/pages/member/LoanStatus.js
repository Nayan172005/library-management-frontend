import React, { useState } from 'react';

function LoanStatus() {
  // Sample loan data
  const [loans] = useState([
    { 
      id: 'L001', 
      book: 'Introduction to Algorithms', 
      author: 'Thomas H. Cormen',
      borrowDate: '2026-02-01', 
      dueDate: '2026-02-15', 
      returnDate: null,
      fine: 0,
      status: 'Active'
    },
    { 
      id: 'L002', 
      book: 'Database Management Systems', 
      author: 'Raghu Ramakrishnan',
      borrowDate: '2026-02-05', 
      dueDate: '2026-02-19', 
      returnDate: null,
      fine: 25,
      status: 'Overdue'
    },
    { 
      id: 'L003', 
      book: 'The Great Gatsby', 
      author: 'F. Scott Fitzgerald',
      borrowDate: '2026-01-15', 
      dueDate: '2026-01-29', 
      returnDate: '2026-01-28',
      fine: 0,
      status: 'Returned'
    },
    { 
      id: 'L004', 
      book: 'Clean Code', 
      author: 'Robert C. Martin',
      borrowDate: '2026-02-10', 
      dueDate: '2026-02-24', 
      returnDate: null,
      fine: 0,
      status: 'Active'
    },
    { 
      id: 'L005', 
      book: 'The Hobbit', 
      author: 'J.R.R. Tolkien',
      borrowDate: '2026-01-20', 
      dueDate: '2026-02-03', 
      returnDate: '2026-02-05',
      fine: 10,
      status: 'Returned'
    },
    { 
      id: 'L006', 
      book: 'Sapiens', 
      author: 'Yuval Noah Harari',
      borrowDate: '2026-02-12', 
      dueDate: '2026-02-26', 
      returnDate: null,
      fine: 0,
      status: 'Active'
    },
  ]);

  const [filter, setFilter] = useState('All');

  // Calculate statistics
  const activeLoans = loans.filter(l => l.status === 'Active').length;
  const overdueLoans = loans.filter(l => l.status === 'Overdue').length;
  const returnedLoans = loans.filter(l => l.status === 'Returned').length;

  // Filter loans based on status
  const filteredLoans = filter === 'All' 
    ? loans 
    : loans.filter(loan => loan.status === filter);

  // Calculate days remaining or overdue
  const getDaysInfo = (dueDate, status) => {
    if (status === 'Returned') return null;
    
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { text: `${Math.abs(diffDays)} days overdue`, class: 'danger' };
    } else if (diffDays === 0) {
      return { text: 'Due today', class: 'warning' };
    } else {
      return { text: `${diffDays} days left`, class: 'success' };
    }
  };

  // Handle renew loan
  const handleRenew = (loanId) => {
    alert(`Renewal request sent for Loan ID: ${loanId}`);
    // In real implementation, this would call an API
  };

  return (
    <div className="loan-status-page">
      <h2 className="mb-4">📋 Loan Status</h2>

      {/* Statistics Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-2">Active Loans</h6>
                  <h2 className="mb-0">{activeLoans}</h2>
                </div>
                <i className="bi bi-book fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-warning text-dark">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-2">Overdue</h6>
                  <h2 className="mb-0">{overdueLoans}</h2>
                </div>
                <i className="bi bi-exclamation-triangle-fill fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-2">Returned</h6>
                  <h2 className="mb-0">{returnedLoans}</h2>
                </div>
                <i className="bi bi-check-circle-fill fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Options */}
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
                <option value="All">All Loans</option>
                <option value="Active">Active</option>
                <option value="Overdue">Overdue</option>
                <option value="Returned">Returned</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Loans Table */}
      <div className="card shadow-sm">
        <div className="card-header bg-white">
          <h5 className="mb-0">Loan History</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th>Loan ID</th>
                <th>Book</th>
                <th>Author</th>
                <th>Borrow Date</th>
                <th>Due Date</th>
                <th>Return Date</th>
                <th>Fine</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.length > 0 ? (
                filteredLoans.map((loan) => {
                  const daysInfo = getDaysInfo(loan.dueDate, loan.status);
                  
                  return (
                    <tr key={loan.id}>
                      <td className="fw-semibold">{loan.id}</td>
                      <td>{loan.book}</td>
                      <td>{loan.author}</td>
                      <td>{loan.borrowDate}</td>
                      <td>
                        {loan.dueDate}
                        {daysInfo && (
                          <div>
                            <small className={`text-${daysInfo.class}`}>
                              <i className={`bi bi-clock-${daysInfo.class === 'success' ? '' : 'exclamation-'}me-1`}></i>
                              {daysInfo.text}
                            </small>
                          </div>
                        )}
                      </td>
                      <td>{loan.returnDate || '-'}</td>
                      <td>
                        {loan.fine > 0 ? (
                          <span className="fw-bold text-danger">₹{loan.fine}</span>
                        ) : (
                          <span className="text-muted">-</span>
                        )}
                      </td>
                      <td>
                        <span className={`badge ${
                          loan.status === 'Active' ? 'bg-primary' : 
                          loan.status === 'Overdue' ? 'bg-danger' : 
                          'bg-success'
                        }`}>
                          {loan.status}
                        </span>
                      </td>
                      <td>
                        {loan.status === 'Active' && (
                          <button 
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleRenew(loan.id)}
                            title="Renew loan"
                          >
                            <i className="bi bi-arrow-repeat me-1"></i>
                            Renew
                          </button>
                        )}
                        {loan.status === 'Overdue' && (
                          <button 
                            className="btn btn-sm btn-warning"
                            onClick={() => handleRenew(loan.id)}
                          >
                            <i className="bi bi-exclamation-triangle me-1"></i>
                            Pay Fine & Renew
                          </button>
                        )}
                        {loan.status === 'Returned' && (
                          <span className="text-muted">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-5">
                    <i className="bi bi-journal-x fs-1 text-muted d-block mb-3"></i>
                    <h5 className="text-muted">No loans found</h5>
                    <p className="text-muted mb-0">You have no {filter.toLowerCase()} loans</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="card-footer bg-white">
          <div className="row">
            <div className="col-md-6">
              <small className="text-muted">
                <i className="bi bi-info-circle me-1"></i>
                Books can be renewed up to 2 times if no reservations are pending
              </small>
            </div>
            <div className="col-md-6 text-md-end">
              <small className="text-muted">
                <strong>Total Active Loans:</strong> {activeLoans} | 
                <strong className="ms-2">Overdue:</strong> {overdueLoans}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanStatus;