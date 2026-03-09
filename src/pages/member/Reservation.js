import React, { useState } from 'react';

function Reservation() {
  // Sample reservation data
  const [reservations, setReservations] = useState([
    { 
      id: 'R001', 
      bookId: 'B003',
      book: 'Software Engineering', 
      author: 'Ian Sommerville',
      category: 'Computer Science',
      reservedDate: '2026-02-20', 
      availableDate: '2026-03-05', 
      queuePosition: 1,
      status: 'Pending'
    },
    { 
      id: 'R002', 
      bookId: 'B007',
      book: 'The Art of Computer Programming', 
      author: 'Donald Knuth',
      category: 'Computer Science',
      reservedDate: '2026-02-18', 
      availableDate: '2026-03-10', 
      queuePosition: 2,
      status: 'Pending'
    },
    { 
      id: 'R003', 
      bookId: 'B010',
      book: 'Sapiens', 
      author: 'Yuval Noah Harari',
      category: 'History',
      reservedDate: '2026-02-15', 
      availableDate: '2026-02-28', 
      queuePosition: 1,
      status: 'Ready'
    },
    { 
      id: 'R004', 
      bookId: 'B005',
      book: 'Clean Code', 
      author: 'Robert C. Martin',
      category: 'Computer Science',
      reservedDate: '2026-02-10', 
      availableDate: '2026-02-25', 
      queuePosition: 3,
      status: 'Fulfilled'
    },
  ]);

  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Available books for new reservation (mock data)
  const availableBooks = [
    { id: 'B011', title: 'Design Patterns', author: 'Erich Gamma', category: 'Computer Science' },
    { id: 'B012', title: 'The Pragmatic Programmer', author: 'David Thomas', category: 'Computer Science' },
    { id: 'B013', title: '1984', author: 'George Orwell', category: 'Fiction' },
  ];

  // Filter reservations
  const filteredReservations = reservations
    .filter(res => filter === 'All' ? true : res.status === filter)
    .filter(res => 
      res.book.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Handle cancel reservation
  const handleCancel = (reservationId) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      setReservations(reservations.filter(r => r.id !== reservationId));
      alert('Reservation cancelled successfully!');
    }
  };

  // Handle borrow from reservation
  const handleBorrow = (reservationId) => {
    alert(`Borrow request sent for Reservation ID: ${reservationId}`);
    // In real implementation, this would update the reservation status
  };

  // Handle new reservation
  const handleNewReservation = (book) => {
    alert(`Reservation request sent for: ${book.title}`);
    // In real implementation, this would add a new reservation
  };

  return (
    <div className="reservation-page">
      <h2 className="mb-4">My Reservations</h2>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-2">Pending</h6>
                  <h2 className="mb-0">{reservations.filter(r => r.status === 'Pending').length}</h2>
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
                  <h6 className="card-title mb-2">Ready for Pickup</h6>
                  <h2 className="mb-0">{reservations.filter(r => r.status === 'Ready').length}</h2>
                </div>
                <i className="bi bi-check-circle-fill fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-2">Total</h6>
                  <h2 className="mb-0">{reservations.length}</h2>
                </div>
                <i className="bi bi-bookmark-fill fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Search</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by book title, author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Filter by Status</label>
              <select 
                className="form-select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All Reservations</option>
                <option value="Pending">Pending</option>
                <option value="Ready">Ready for Pickup</option>
                <option value="Fulfilled">Fulfilled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Reservations Table */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Current Reservations</h5>
          <span className="badge bg-primary">{filteredReservations.length} reservations</span>
        </div>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th>Reservation ID</th>
                <th>Book</th>
                <th>Author</th>
                <th>Category</th>
                <th>Reserved Date</th>
                <th>Expected Availability</th>
                <th>Queue Position</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.length > 0 ? (
                filteredReservations.map((res) => (
                  <tr key={res.id}>
                    <td className="fw-semibold">{res.id}</td>
                    <td>{res.book}</td>
                    <td>{res.author}</td>
                    <td>
                      <span className="badge bg-light text-dark">{res.category}</span>
                    </td>
                    <td>{res.reservedDate}</td>
                    <td>
                      <span className={`badge ${res.status === 'Ready' ? 'bg-success' : 'bg-info'}`}>
                        {res.availableDate}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${res.queuePosition === 1 ? 'bg-warning text-dark' : 'bg-secondary'}`}>
                        #{res.queuePosition}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${
                        res.status === 'Pending' ? 'bg-primary' :
                        res.status === 'Ready' ? 'bg-success' :
                        'bg-secondary'
                      }`}>
                        {res.status}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        {res.status === 'Ready' && (
                          <button 
                            className="btn btn-sm btn-success"
                            onClick={() => handleBorrow(res.id)}
                          >
                            <i className="bi bi-box-arrow-in-right me-1"></i>
                            Borrow Now
                          </button>
                        )}
                        {res.status === 'Pending' && (
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleCancel(res.id)}
                          >
                            <i className="bi bi-x-circle me-1"></i>
                            Cancel
                          </button>
                        )}
                        {res.status === 'Fulfilled' && (
                          <span className="text-muted">Completed</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-5">
                    <i className="bi bi-bookmark-x fs-1 text-muted d-block mb-3"></i>
                    <h5 className="text-muted">No reservations found</h5>
                    <p className="text-muted mb-0">You haven't made any reservations yet</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Available Books to Reserve */}
      <div className="card shadow-sm">
        <div className="card-header bg-white">
          <h5 className="mb-0">Popular Books You Can Reserve</h5>
        </div>
        <div className="card-body">
          <div className="row">
            {availableBooks.map((book) => (
              <div className="col-md-4 mb-3" key={book.id}>
                <div className="card h-100 border">
                  <div className="card-body">
                    <h6 className="fw-bold">{book.title}</h6>
                    <p className="text-muted small mb-2">by {book.author}</p>
                    <span className="badge bg-light text-dark mb-2">{book.category}</span>
                    <button 
                      className="btn btn-sm btn-outline-primary w-100 mt-2"
                      onClick={() => handleNewReservation(book)}
                    >
                      <i className="bi bi-bookmark-plus me-1"></i>
                      Reserve
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservation;