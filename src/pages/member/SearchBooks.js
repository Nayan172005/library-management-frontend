import React, { useState } from 'react';
import './SearchBooks.css';

function SearchBooks() {
  // Sample book data
  const [books] = useState([
    { id: 'B001', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'Computer Science', status: 'Available' },
    { id: 'B002', title: 'Database Management Systems', author: 'Raghu Ramakrishnan', category: 'Computer Science', status: 'Borrowed' },
    { id: 'B003', title: 'Software Engineering', author: 'Ian Sommerville', category: 'Computer Science', status: 'Available' },
    { id: 'B004', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', status: 'Available' },
    { id: 'B005', title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', status: 'Reserved' },
    { id: 'B006', title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', status: 'Available' },
    { id: 'B007', title: 'The Art of Computer Programming', author: 'Donald Knuth', category: 'Computer Science', status: 'Borrowed' },
    { id: 'B008', title: 'Clean Code', author: 'Robert C. Martin', category: 'Computer Science', status: 'Available' },
    { id: 'B009', title: 'The Hobbit', author: 'J.R.R. Tolkien', category: 'Fiction', status: 'Available' },
    { id: 'B010', title: 'Sapiens', author: 'Yuval Noah Harari', category: 'History', status: 'Available' },
  ]);

  // Categories for filter dropdown
  const categories = ['All', 'Computer Science', 'Fiction', 'Science', 'History', 'Mathematics'];
  
  // State for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  // Filter books based on search and category
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // Handle borrow action
  const handleBorrow = (bookId) => {
    alert(`Borrow request sent for book ID: ${bookId}`);
    // In real implementation, this would call an API
  };

  // Handle reserve action
  const handleReserve = (bookId) => {
    alert(`Book ID: ${bookId} has been reserved`);
    // In real implementation, this would call an API
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Available':
        return 'bg-success';
      case 'Borrowed':
        return 'bg-warning text-dark';
      case 'Reserved':
        return 'bg-info text-dark';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="search-books-page">
      <h2 className="mb-4">Search Books</h2>
      
      {/* Search and Filter Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-8">
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by book title, author, or ID..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page on new search
                  }}
                />
                {searchTerm && (
                  <button 
                    className="btn btn-outline-secondary" 
                    type="button"
                    onClick={() => {
                      setSearchTerm('');
                      setCurrentPage(1);
                    }}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                )}
              </div>
            </div>
            <div className="col-md-4">
              <select 
                className="form-select"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="text-muted mb-0">
          Showing {indexOfFirstBook + 1}-{Math.min(indexOfLastBook, filteredBooks.length)} of {filteredBooks.length} books
        </p>
        <span className="badge bg-primary">
          {filteredBooks.length} books found
        </span>
      </div>

      {/* Books Table */}
      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th className="px-4">Book ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.length > 0 ? (
                currentBooks.map((book) => (
                  <tr key={book.id}>
                    <td className="px-4 fw-semibold">{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>
                      <span className="badge bg-light text-dark">
                        {book.category}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(book.status)}`}>
                        {book.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <button 
                          className="btn btn-sm btn-success"
                          onClick={() => handleBorrow(book.id)}
                          disabled={book.status !== 'Available'}
                          title={book.status !== 'Available' ? 'Not available for borrowing' : 'Borrow this book'}
                        >
                          <i className="bi bi-box-arrow-in-right me-1"></i>
                          Borrow
                        </button>
                        <button 
                          className="btn btn-sm btn-warning"
                          onClick={() => handleReserve(book.id)}
                          disabled={book.status === 'Reserved'}
                          title={book.status === 'Reserved' ? 'Already reserved' : 'Reserve this book'}
                        >
                          <i className="bi bi-bookmark-plus me-1"></i>
                          Reserve
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    <i className="bi bi-emoji-frown fs-1 text-muted d-block mb-3"></i>
                    <h5 className="text-muted">No books found</h5>
                    <p className="text-muted mb-0">Try adjusting your search or filter criteria</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredBooks.length > 0 && (
          <div className="card-footer bg-white d-flex justify-content-between align-items-center">
            <small className="text-muted">
              Page {currentPage} of {totalPages}
            </small>
            <nav>
              <ul className="pagination mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button 
                      className="page-link"
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card bg-light border-0">
            <div className="card-body d-flex align-items-center">
              <i className="bi bi-book fs-1 text-primary me-3"></i>
              <div>
                <h6 className="mb-0">Total Books</h6>
                <h4 className="mb-0">{books.length}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-light border-0">
            <div className="card-body d-flex align-items-center">
              <i className="bi bi-check-circle fs-1 text-success me-3"></i>
              <div>
                <h6 className="mb-0">Available Now</h6>
                <h4 className="mb-0">{books.filter(b => b.status === 'Available').length}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-light border-0">
            <div className="card-body d-flex align-items-center">
              <i className="bi bi-clock-history fs-1 text-warning me-3"></i>
              <div>
                <h6 className="mb-0">Borrowed/Reserved</h6>
                <h4 className="mb-0">{books.filter(b => b.status !== 'Available').length}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBooks;