import React, { useState } from 'react';
// import './ManageBooks.css';

function ManageBooks() {
  // Form state
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    author: '',
    category: '',
    edition: '',
    status: 'Available'
  });

  // Books state
  const [books, setBooks] = useState([
    { id: 'B001', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'Computer Science', edition: '3rd', status: 'Available' },
    { id: 'B002', title: 'Database Management Systems', author: 'Raghu Ramakrishnan', category: 'Computer Science', edition: '2nd', status: 'Borrowed' },
    { id: 'B003', title: 'Software Engineering', author: 'Ian Sommerville', category: 'Computer Science', edition: '10th', status: 'Available' },
    { id: 'B004', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', edition: '1st', status: 'Reserved' },
    { id: 'B005', title: 'Clean Code', author: 'Robert C. Martin', category: 'Computer Science', edition: '1st', status: 'Available' },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Categories for dropdown
  const categories = ['Computer Science', 'Fiction', 'Science', 'History', 'Mathematics', 'Engineering'];

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Generate new book ID
  const generateBookId = () => {
    const lastBook = books[books.length - 1];
    if (!lastBook) return 'B001';
    const lastId = parseInt(lastBook.id.substring(1));
    return `B${String(lastId + 1).padStart(3, '0')}`;
  };

  // Handle Add
  const handleAdd = () => {
    if (!formData.title || !formData.author || !formData.category) {
      alert('Please fill in all required fields (Title, Author, Category)');
      return;
    }

    const newBook = {
      ...formData,
      id: generateBookId()
    };

    setBooks([...books, newBook]);
    resetForm();
    alert('Book added successfully!');
  };

  // Handle Update
  const handleUpdate = () => {
    if (!formData.id) {
      alert('Please select a book to update');
      return;
    }

    const updatedBooks = books.map(book => 
      book.id === formData.id ? formData : book
    );

    setBooks(updatedBooks);
    resetForm();
    setIsEditing(false);
    alert('Book updated successfully!');
  };

  // Handle Delete
  const handleDelete = (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      const filteredBooks = books.filter(book => book.id !== bookId);
      setBooks(filteredBooks);
      if (formData.id === bookId) {
        resetForm();
      }
      alert('Book deleted successfully!');
    }
  };

  // Handle Edit (populate form)
  const handleEdit = (book) => {
    setFormData(book);
    setIsEditing(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      author: '',
      category: '',
      edition: '',
      status: 'Available'
    });
    setIsEditing(false);
  };

  // Filter books based on search
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="manage-books-page">
      <h2 className="mb-4">📚 Manage Books</h2>

      {/* Book Form Card */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-white">
          <h5 className="mb-0">{isEditing ? 'Edit Book' : 'Add New Book'}</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Title *</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter book title"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Author *</label>
              <input
                type="text"
                className="form-control"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Enter author name"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Category *</label>
              <select
                className="form-select"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Select Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Edition</label>
              <input
                type="text"
                className="form-control"
                name="edition"
                value={formData.edition}
                onChange={handleInputChange}
                placeholder="e.g., 1st, 2nd, 3rd"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Status</label>
              <select
                className="form-select"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="Available">Available</option>
                <option value="Borrowed">Borrowed</option>
                <option value="Reserved">Reserved</option>
              </select>
            </div>
          </div>

          {/* Form Buttons */}
          <div className="mt-4 d-flex gap-2">
            <button 
              className="btn btn-primary px-4"
              onClick={isEditing ? handleUpdate : handleAdd}
            >
              <i className={`bi ${isEditing ? 'bi-pencil-square' : 'bi-plus-circle'} me-2`}></i>
              {isEditing ? 'Update Book' : 'Add Book'}
            </button>
            {isEditing && (
              <button 
                className="btn btn-outline-secondary px-4"
                onClick={resetForm}
              >
                <i className="bi bi-x-circle me-2"></i>
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Books List Card */}
      <div className="card shadow-sm">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Books List</h5>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Edition</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <tr key={book.id}>
                    <td className="fw-semibold">{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>
                      <span className="badge bg-light text-dark">{book.category}</span>
                    </td>
                    <td>{book.edition || '-'}</td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(book.status)}`}>
                        {book.status}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <button 
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEdit(book)}
                          title="Edit book"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(book.id)}
                          title="Delete book"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-5">
                    <i className="bi bi-journal-x fs-1 text-muted d-block mb-3"></i>
                    <h5 className="text-muted">No books found</h5>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="card-footer bg-white">
          <small className="text-muted">
            Total Books: {filteredBooks.length} | 
            Available: {books.filter(b => b.status === 'Available').length} | 
            Borrowed: {books.filter(b => b.status === 'Borrowed').length} | 
            Reserved: {books.filter(b => b.status === 'Reserved').length}
          </small>
        </div>
      </div>
    </div>
  );
}

export default ManageBooks;