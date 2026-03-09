import React, { useState } from 'react';

function BorrowReturn() {
  // Sample current loans
  const [currentLoans, setCurrentLoans] = useState([
    { 
      id: 'L001', 
      book: 'Introduction to Algorithms', 
      author: 'Thomas H. Cormen',
      borrowDate: '2026-02-01', 
      dueDate: '2026-02-15', 
      daysLeft: 3,
      fine: 0,
      renewable: true
    },
    { 
      id: 'L002', 
      book: 'Database Management Systems', 
      author: 'Raghu Ramakrishnan',
      borrowDate: '2026-02-05', 
      dueDate: '2026-02-19', 
      daysLeft: -2,
      fine: 10,
      renewable: false
    },
    { 
      id: 'L003', 
      book: 'The Great Gatsby', 
      author: 'F. Scott Fitzgerald',
      borrowDate: '2026-02-10', 
      dueDate: '2026-02-24', 
      daysLeft: 8,
      fine: 0,
      renewable: true
    },
  ]);

  // Sample books available for borrowing
  const [availableBooks] = useState([
    { id: 'B001', title: 'Clean Code', author: 'Robert C. Martin', available: true },
    { id: 'B002', title: 'The Pragmatic Programmer', author: 'David Thomas', available: true },
    { id: 'B003', title: 'Design Patterns', author: 'Erich Gamma', available: false },
    { id: 'B004', title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', available: true },
  ]);

  const [returnSelected, setReturnSelected] = useState([]);
  const [borrowSearch, setBorrowSearch] = useState('');

  // Handle return checkbox
  const handleReturnSelect = (loanId) => {
    if (returnSelected.includes(loanId)) {
      setReturnSelected(returnSelected.filter(id => id !== loanId));
    } else {
      setReturnSelected([...returnSelected, loanId]);
    }
  };

  // Handle return all selected
  const handleReturnSelected = () => {
    if (returnSelected.length === 0) {
      alert('Please select books to return');
      return;
    }

    if (window.confirm(`Return ${returnSelected.length} book(s)?`)) {
      setCurrentLoans(currentLoans.filter(loan => !returnSelected.includes(loan.id)));
      setReturnSelected([]);
      alert('Books returned successfully!');
    }
  };

  // Handle return single book
  const handleReturnSingle = (loanId) => {
    if (window.confirm('Return this book?')) {
      setCurrentLoans(currentLoans.filter(loan => loan.id !== loanId));
      alert('Book returned successfully!');
    }
  };

  // Handle renew loan
  const handleRenew = (loanId) => {
    alert(`Renewal request sent for Loan ID: ${loanId}`);
    // In real implementation, this would update the due date
  };

  // Handle borrow book
  const handleBorrow = (bookId) => {
    alert(`Borrow request sent for Book ID: ${bookId}`);
    // In real implementation, this would add a new loan
  }

  // Calculate totals
  const totalFines = currentLoans.reduce((sum, loan) => sum + loan.fine, 0);
  const overdueCount = currentLoans.filter(loan => loan.daysLeft < 0).length;

  return (
    <div className="borrow-return-page">
      <h2 className="mb-4">Borrow / Return</h2>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-2">Currently Borrowed</h6>
                  <h2 className="mb-0">{currentLoans.length}</h2>
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
                  <h6 className="card-title mb-2">Overdue Books</h6>
                  <h2 className="mb-0">{overdueCount}</h2>
                </div>
                <i className="bi bi-exclamation-triangle-fill fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-2">Total Fines</h6>
                  <h2 className="mb-0">₹{totalFines}</h2>
                </div>
                <i className="bi bi-cash-stack fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Return Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">📤 Return Books</h5>
          {returnSelected.length > 0 && (
            <button 
              className="btn btn-success btn-sm"
              onClick={handleReturnSelected}
            >
              <i className="bi bi-check-all me-1"></i>
              Return Selected ({returnSelected.length})
            </button>
          )}
        </div>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th width="50">Select</th>
                <th>Book</th>
                <th>Author</th>
                <th>Borrow Date</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Fine</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentLoans.length > 0 ? (
                currentLoans.map((loan) => (
                  <tr key={loan.id} className={loan.daysLeft < 0 ? 'table-danger' : ''}>
                    <td className="text-center">
                      <input 
                        type="checkbox"
                        className="form-check-input"
                        checked={returnSelected.includes(loan.id)}
                        onChange={() => handleReturnSelect(loan.id)}
                      />
                    </td>
                    <td className="fw-semibold">{loan.book}</td>
                    <td>{loan.author}</td>
                    <td>{loan.borrowDate}</td>
                    <td>{loan.dueDate}</td>
                    <td>
                      {loan.daysLeft < 0 ? (
                        <span className="badge bg-danger">
                          {Math.abs(loan.daysLeft)} days overdue
                        </span>
                      ) : loan.daysLeft === 0 ? (
                        <span className="badge bg-warning text-dark">
                          Due today
                        </span>
                      ) : (
                        <span className="badge bg-success">
                          {loan.daysLeft} days left
                        </span>
                      )}
                    </td>
                    <td>
                      {loan.fine > 0 ? (
                        <span className="fw-bold text-danger">₹{loan.fine}</span>
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button 
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleReturnSingle(loan.id)}
                          title="Return this book"
                        >
                          <i className="bi bi-arrow-return-left"></i>
                        </button>
                        {loan.renewable && loan.daysLeft >= 0 && (
                          <button 
                            className="btn btn-sm btn-outline-success"
                            onClick={() => handleRenew(loan.id)}
                            title="Renew loan"
                          >
                            <i className="bi bi-arrow-repeat"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    <p className="text-muted mb-0">No books currently borrowed</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Borrow Section */}
      <div className="card shadow-sm">
        <div className="card-header bg-white">
          <h5 className="mb-0">📚 Borrow Books</h5>
        </div>
        <div className="card-body">
          {/* Search */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search available books..."
                  value={borrowSearch}
                  onChange={(e) => setBorrowSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Available Books Grid */}
          <div className="row">
            {availableBooks
              .filter(book => 
                book.title.toLowerCase().includes(borrowSearch.toLowerCase()) ||
                book.author.toLowerCase().includes(borrowSearch.toLowerCase())
              )
              .map((book) => (
                <div className="col-md-6 mb-3" key={book.id}>
                  <div className="card border">
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="fw-bold mb-1">{book.title}</h6>
                        <p className="text-muted small mb-0">by {book.author}</p>
                        <span className={`badge ${book.available ? 'bg-success' : 'bg-secondary'}`}>
                          {book.available ? 'Available' : 'Borrowed'}
                        </span>
                      </div>
                      <button 
                        className={`btn btn-sm ${book.available ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => handleBorrow(book.id)}
                        disabled={!book.available}
                      >
                        {book.available ? (
                          <>
                            <i className="bi bi-box-arrow-in-right me-1"></i>
                            Borrow
                          </>
                        ) : (
                          'Not Available'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Borrowing Rules */}
          <div className="alert alert-info mt-3 mb-0">
            <i className="bi bi-info-circle me-2"></i>
            <strong>Borrowing Rules:</strong> Maximum 5 books at a time. Loan period is 14 days. 
            Fine of ₹5 per day for late returns.
          </div>
        </div>
      </div>
    </div>
  );
}

export default BorrowReturn;