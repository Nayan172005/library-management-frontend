import React, { useState } from 'react';

function GenerateReports() {
  const [selectedReport, setSelectedReport] = useState('inventory');
  const [dateRange, setDateRange] = useState({
    from: '2026-02-01',
    to: '2026-02-28'
  });
  const [generatedReports, setGeneratedReports] = useState([]);

  // Sample report data
  const reportData = {
    inventory: {
      title: 'Inventory Report',
      data: [
        { category: 'Computer Science', total: 450, available: 320, borrowed: 110, reserved: 20 },
        { category: 'Fiction', total: 380, available: 250, borrowed: 100, reserved: 30 },
        { category: 'Science', total: 220, available: 150, borrowed: 60, reserved: 10 },
        { category: 'History', total: 180, available: 120, borrowed: 50, reserved: 10 },
        { category: 'Mathematics', total: 150, available: 100, borrowed: 40, reserved: 10 },
      ],
      summary: {
        totalBooks: 1380,
        totalAvailable: 940,
        totalBorrowed: 360,
        totalReserved: 80
      }
    },
    circulation: {
      title: 'Circulation Report',
      data: [
        { date: '2026-02-01', borrowed: 25, returned: 18, reserved: 5 },
        { date: '2026-02-02', borrowed: 32, returned: 22, reserved: 8 },
        { date: '2026-02-03', borrowed: 28, returned: 25, reserved: 6 },
        { date: '2026-02-04', borrowed: 35, returned: 30, reserved: 7 },
        { date: '2026-02-05', borrowed: 30, returned: 28, reserved: 9 },
        { date: '2026-02-06', borrowed: 42, returned: 35, reserved: 10 },
        { date: '2026-02-07', borrowed: 38, returned: 32, reserved: 8 },
      ],
      summary: {
        totalBorrowed: 230,
        totalReturned: 190,
        totalReserved: 53,
        avgDailyBorrow: 32.8
      }
    },
    fines: {
      title: 'Fines Collection Report',
      data: [
        { date: '2026-02-01', finesCollected: 1250, pendingFines: 3450, waived: 150 },
        { date: '2026-02-02', finesCollected: 980, pendingFines: 4320, waived: 200 },
        { date: '2026-02-03', finesCollected: 1560, pendingFines: 3980, waived: 175 },
        { date: '2026-02-04', finesCollected: 1420, pendingFines: 4120, waived: 225 },
        { date: '2026-02-05', finesCollected: 1680, pendingFines: 3890, waived: 190 },
        { date: '2026-02-06', finesCollected: 1890, pendingFines: 3750, waived: 210 },
        { date: '2026-02-07', finesCollected: 2100, pendingFines: 3520, waived: 185 },
      ],
      summary: {
        totalCollected: 10880,
        currentPending: 3520,
        totalWaived: 1335,
        avgDailyCollection: 1554
      }
    },
    popular: {
      title: 'Popular Books Report',
      data: [
        { rank: 1, book: 'Introduction to Algorithms', author: 'Thomas H. Cormen', timesBorrowed: 45, category: 'Computer Science' },
        { rank: 2, book: 'Clean Code', author: 'Robert C. Martin', timesBorrowed: 42, category: 'Computer Science' },
        { rank: 3, book: 'The Great Gatsby', author: 'F. Scott Fitzgerald', timesBorrowed: 38, category: 'Fiction' },
        { rank: 4, book: 'Database Management Systems', author: 'Raghu Ramakrishnan', timesBorrowed: 35, category: 'Computer Science' },
        { rank: 5, book: 'Sapiens', author: 'Yuval Noah Harari', timesBorrowed: 32, category: 'History' },
        { rank: 6, book: 'The Hobbit', author: 'J.R.R. Tolkien', timesBorrowed: 30, category: 'Fiction' },
        { rank: 7, book: 'A Brief History of Time', author: 'Stephen Hawking', timesBorrowed: 28, category: 'Science' },
        { rank: 8, book: 'Software Engineering', author: 'Ian Sommerville', timesBorrowed: 25, category: 'Computer Science' },
      ]
    }
  };

  // Handle generate report
  const handleGenerateReport = () => {
    const newReport = {
      id: `RPT${String(generatedReports.length + 1).padStart(3, '0')}`,
      type: selectedReport,
      dateRange: `${dateRange.from} to ${dateRange.to}`,
      generatedAt: new Date().toLocaleString(),
      ...reportData[selectedReport]
    };
    
    setGeneratedReports([newReport, ...generatedReports]);
    alert('Report generated successfully!');
  };

  // Handle download report
  const handleDownload = (report) => {
    alert(`Downloading ${report.title}...`);
    // In real implementation, this would generate PDF/CSV
  };

  // Handle print report
  const handlePrint = (report) => {
    alert(`Printing ${report.title}...`);
    // In real implementation, this would open print dialog
  };

  return (
    <div className="generate-reports-page">
      <h2 className="mb-4">📊 Generate Reports</h2>

      {/* Report Generator Form */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-white">
          <h5 className="mb-0">Report Generator</h5>
        </div>
        <div className="card-body">
          <div className="row g-4">
            <div className="col-md-4">
              <label className="form-label fw-semibold">Report Type</label>
              <select 
                className="form-select"
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
              >
                <option value="inventory">📚 Inventory Report</option>
                <option value="circulation">🔄 Circulation Report</option>
                <option value="fines">💰 Fines Collection Report</option>
                <option value="popular">⭐ Popular Books Report</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">From Date</label>
              <input 
                type="date" 
                className="form-control"
                value={dateRange.from}
                onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">To Date</label>
              <input 
                type="date" 
                className="form-control"
                value={dateRange.to}
                onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
              />
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button 
                className="btn btn-primary w-100"
                onClick={handleGenerateReport}
              >
                <i className="bi bi-file-earmark-text me-2"></i>
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Reports List */}
      {generatedReports.length > 0 && (
        <div className="mb-4">
          <h5 className="mb-3">Recent Reports</h5>
          <div className="row">
            {generatedReports.map((report) => (
              <div className="col-md-6 mb-3" key={report.id}>
                <div className="card border">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h6 className="fw-bold mb-1">{report.title}</h6>
                        <small className="text-muted d-block">
                          <i className="bi bi-calendar me-1"></i>
                          {report.dateRange}
                        </small>
                        <small className="text-muted">
                          <i className="bi bi-clock me-1"></i>
                          Generated: {report.generatedAt}
                        </small>
                      </div>
                      <span className="badge bg-primary">{report.id}</span>
                    </div>
                    
                    <hr />
                    
                    {/* Report Preview based on type */}
                    {report.type === 'inventory' && (
                      <div className="small">
                        <div className="d-flex justify-content-between mb-1">
                          <span>Total Books:</span>
                          <span className="fw-bold">{report.summary.totalBooks}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-1">
                          <span>Available:</span>
                          <span className="fw-bold text-success">{report.summary.totalAvailable}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-1">
                          <span>Borrowed:</span>
                          <span className="fw-bold text-warning">{report.summary.totalBorrowed}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Reserved:</span>
                          <span className="fw-bold text-info">{report.summary.totalReserved}</span>
                        </div>
                      </div>
                    )}

                    {report.type === 'circulation' && (
                      <div className="small">
                        <div className="d-flex justify-content-between mb-1">
                          <span>Total Borrowed:</span>
                          <span className="fw-bold">{report.summary.totalBorrowed}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-1">
                          <span>Total Returned:</span>
                          <span className="fw-bold text-success">{report.summary.totalReturned}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Avg Daily Borrow:</span>
                          <span className="fw-bold">{report.summary.avgDailyBorrow}</span>
                        </div>
                      </div>
                    )}

                    {report.type === 'fines' && (
                      <div className="small">
                        <div className="d-flex justify-content-between mb-1">
                          <span>Total Collected:</span>
                          <span className="fw-bold text-success">₹{report.summary.totalCollected}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-1">
                          <span>Pending Fines:</span>
                          <span className="fw-bold text-danger">₹{report.summary.currentPending}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Avg Daily Collection:</span>
                          <span className="fw-bold">₹{report.summary.avgDailyCollection}</span>
                        </div>
                      </div>
                    )}

                    {report.type === 'popular' && (
                      <div className="small">
                        <div className="mb-1">
                          <span className="fw-bold">Top 3 Books:</span>
                        </div>
                        {report.data.slice(0, 3).map((book, idx) => (
                          <div key={idx} className="d-flex justify-content-between mb-1">
                            <span>{idx+1}. {book.book.substring(0, 20)}...</span>
                            <span className="fw-bold">{book.timesBorrowed}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <hr />
                    
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-sm btn-outline-primary flex-grow-1"
                        onClick={() => handleDownload(report)}
                      >
                        <i className="bi bi-download me-1"></i>
                        Download
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handlePrint(report)}
                      >
                        <i className="bi bi-printer"></i>
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => setGeneratedReports(generatedReports.filter(r => r.id !== report.id))}
                      >
                        <i className="bi bi-x-lg"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sample Report Preview */}
      <div className="card shadow-sm">
        <div className="card-header bg-white">
          <h5 className="mb-0">Sample Report: {reportData[selectedReport].title}</h5>
        </div>
        <div className="card-body">
          {/* Inventory Report */}
          {selectedReport === 'inventory' && (
            <>
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead className="bg-light">
                    <tr>
                      <th>Category</th>
                      <th>Total</th>
                      <th>Available</th>
                      <th>Borrowed</th>
                      <th>Reserved</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.inventory.data.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.category}</td>
                        <td>{item.total}</td>
                        <td className="text-success">{item.available}</td>
                        <td className="text-warning">{item.borrowed}</td>
                        <td className="text-info">{item.reserved}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="row mt-3">
                <div className="col-md-3">
                  <div className="bg-light p-2 rounded text-center">
                    <small className="text-muted">Total Books</small>
                    <h5>{reportData.inventory.summary.totalBooks}</h5>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="bg-light p-2 rounded text-center">
                    <small className="text-muted">Available</small>
                    <h5 className="text-success">{reportData.inventory.summary.totalAvailable}</h5>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="bg-light p-2 rounded text-center">
                    <small className="text-muted">Borrowed</small>
                    <h5 className="text-warning">{reportData.inventory.summary.totalBorrowed}</h5>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="bg-light p-2 rounded text-center">
                    <small className="text-muted">Reserved</small>
                    <h5 className="text-info">{reportData.inventory.summary.totalReserved}</h5>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Circulation Report */}
          {selectedReport === 'circulation' && (
            <>
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead className="bg-light">
                    <tr>
                      <th>Date</th>
                      <th>Borrowed</th>
                      <th>Returned</th>
                      <th>Reserved</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.circulation.data.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.date}</td>
                        <td>{item.borrowed}</td>
                        <td>{item.returned}</td>
                        <td>{item.reserved}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="row mt-3">
                <div className="col-md-4">
                  <div className="bg-light p-2 rounded text-center">
                    <small className="text-muted">Total Borrowed</small>
                    <h5>{reportData.circulation.summary.totalBorrowed}</h5>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="bg-light p-2 rounded text-center">
                    <small className="text-muted">Total Returned</small>
                    <h5 className="text-success">{reportData.circulation.summary.totalReturned}</h5>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="bg-light p-2 rounded text-center">
                    <small className="text-muted">Avg Daily Borrow</small>
                    <h5>{reportData.circulation.summary.avgDailyBorrow}</h5>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Similar sections for other report types... */}
        </div>
      </div>
    </div>
  );
}

export default GenerateReports;