import React from 'react';

function MemberDashboard() {
  // Sample data
  const stats = {
    borrowed: 3,
    reserved: 1,
    fines: 50
  };

  const recentLoans = [
    { id: 1, book: 'Introduction to Algorithms', due: '2026-03-15', status: 'Active' },
    { id: 2, book: 'Database Management Systems', due: '2026-03-10', status: 'Overdue' },
    { id: 3, book: 'Software Engineering', due: '2026-03-20', status: 'Active' }
  ];

  return (
    <>
      <h2 className="mb-4">Member Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-2">Books Borrowed</h6>
                  <h2 className="mb-0">{stats.borrowed}</h2>
                </div>
                <i className="bi bi-book fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-2">Reserved Books</h6>
                  <h2 className="mb-0">{stats.reserved}</h2>
                </div>
                <i className="bi bi-bookmark fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-warning">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-2">Pending Fines</h6>
                  <h2 className="mb-0">₹{stats.fines}</h2>
                </div>
                <i className="bi bi-exclamation-triangle fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Loans */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-white">
              <h5 className="mb-0">Recent Loans</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Book Title</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLoans.map(loan => (
                      <tr key={loan.id}>
                        <td>{loan.book}</td>
                        <td>{loan.due}</td>
                        <td>
                          <span className={`badge bg-${loan.status === 'Active' ? 'success' : 'danger'}`}>
                            {loan.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-primary">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MemberDashboard;