import React, { useState } from 'react';

function ManageUsers() {
  // Form state
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    role: 'Member',
    status: 'Active'
  });

  // Users state
  const [users, setUsers] = useState([
    { id: 'U001', name: 'John Doe', email: 'john@example.com', phone: '9876543210', role: 'Member', status: 'Active' },
    { id: 'U002', name: 'Jane Smith', email: 'jane@example.com', phone: '9876543211', role: 'Member', status: 'Active' },
    { id: 'U003', name: 'Bob Johnson', email: 'bob@example.com', phone: '9876543212', role: 'Librarian', status: 'Active' },
    { id: 'U004', name: 'Alice Brown', email: 'alice@example.com', phone: '9876543213', role: 'Member', status: 'Inactive' },
    { id: 'U005', name: 'Charlie Wilson', email: 'charlie@example.com', phone: '9876543214', role: 'Member', status: 'Active' },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Generate new user ID
  const generateUserId = () => {
    const lastUser = users[users.length - 1];
    if (!lastUser) return 'U001';
    const lastId = parseInt(lastUser.id.substring(1));
    return `U${String(lastId + 1).padStart(3, '0')}`;
  };

  // Handle Add
  const handleAdd = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields (Name, Email, Phone)');
      return;
    }

    // Basic email validation
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      alert('Please enter a valid email address');
      return;
    }

    // Basic phone validation
    if (formData.phone.length !== 10 || isNaN(formData.phone)) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    const newUser = {
      ...formData,
      id: generateUserId()
    };

    setUsers([...users, newUser]);
    resetForm();
    alert('User added successfully!');
  };

  // Handle Update
  const handleUpdate = () => {
    if (!formData.id) {
      alert('Please select a user to update');
      return;
    }

    const updatedUsers = users.map(user => 
      user.id === formData.id ? formData : user
    );

    setUsers(updatedUsers);
    resetForm();
    setIsEditing(false);
    alert('User updated successfully!');
  };

  // Handle Delete
  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const filteredUsers = users.filter(user => user.id !== userId);
      setUsers(filteredUsers);
      if (formData.id === userId) {
        resetForm();
      }
      alert('User deleted successfully!');
    }
  };

  // Handle Edit
  const handleEdit = (user) => {
    setFormData(user);
    setIsEditing(true);
  };

  // Toggle user status
  const toggleStatus = (userId) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === 'Active' ? 'Inactive' : 'Active'
        };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      email: '',
      phone: '',
      role: 'Member',
      status: 'Active'
    });
    setIsEditing(false);
  };

  // Filter users based on search
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  return (
    <div className="manage-users-page">
      <h2 className="mb-4">👥 Manage Users</h2>

      {/* User Form Card */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-white">
          <h5 className="mb-0">{isEditing ? 'Edit User' : 'Add New User'}</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Full Name *</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Email *</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Phone *</label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="10-digit mobile number"
                maxLength="10"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Role</label>
              <select
                className="form-select"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="Member">Member</option>
                <option value="Librarian">Librarian</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Status</label>
              <select
                className="form-select"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Form Buttons */}
          <div className="mt-4 d-flex gap-2">
            <button 
              className="btn btn-primary px-4"
              onClick={isEditing ? handleUpdate : handleAdd}
            >
              <i className={`bi ${isEditing ? 'bi-pencil-square' : 'bi-person-plus'} me-2`}></i>
              {isEditing ? 'Update User' : 'Add User'}
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

      {/* Users List Card */}
      <div className="card shadow-sm">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Users List</h5>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search users..."
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
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="fw-semibold">{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <span className={`badge ${user.role === 'Librarian' ? 'bg-primary' : 'bg-secondary'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${user.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <button 
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEdit(user)}
                          title="Edit user"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-success"
                          onClick={() => toggleStatus(user.id)}
                          title={user.status === 'Active' ? 'Deactivate user' : 'Activate user'}
                        >
                          <i className={`bi ${user.status === 'Active' ? 'bi-pause-circle' : 'bi-play-circle'}`}></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(user.id)}
                          title="Delete user"
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
                    <i className="bi bi-people fs-1 text-muted d-block mb-3"></i>
                    <h5 className="text-muted">No users found</h5>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="card-footer bg-white">
          <small className="text-muted">
            Total Users: {filteredUsers.length} | 
            Active: {users.filter(u => u.status === 'Active').length} | 
            Inactive: {users.filter(u => u.status === 'Inactive').length} | 
            Librarians: {users.filter(u => u.role === 'Librarian').length}
          </small>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;