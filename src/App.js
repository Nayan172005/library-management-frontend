import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Pages
import Home from './pages/Home';
import Login from './pages/member/Login';
import Register from './pages/member/Register';

// Member Pages
import MemberDashboard from './pages/member/Dashboard';
import SearchBooks from './pages/member/SearchBooks';
import BorrowReturn from './pages/member/BorrowReturn';
import Reservation from './pages/member/Reservation';
import LoanStatus from './pages/member/LoanStatus';
import FineDetails from './pages/member/FineDetails';

// Librarian Pages
import AdminDashboard from './pages/librarian/AdminDashboard';
import ManageBooks from './pages/librarian/ManageBooks';
import ManageUsers from './pages/librarian/ManageUsers';
import ApproveRequests from './pages/librarian/ApproveRequests';
import GenerateReports from './pages/librarian/GenerateReports';

// Layouts
import MemberLayout from './components/layouts/MemberLayout';
import LibrarianLayout from './components/layouts/LibrarianLayout';

function App() {
  const [user, setUser] = React.useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        
        {/* Member Routes with Layout */}
        <Route path="/member" element={<MemberLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<MemberDashboard />} />
          <Route path="search" element={<SearchBooks />} />
          <Route path="borrow-return" element={<BorrowReturn />} />
          <Route path="reservation" element={<Reservation />} />
          <Route path="loan-status" element={<LoanStatus />} />
          <Route path="fine-details" element={<FineDetails />} />
        </Route>

        {/* Librarian Routes with Layout */}
        <Route path="/librarian" element={<LibrarianLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="manage-books" element={<ManageBooks />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="approve-requests" element={<ApproveRequests />} />
          <Route path="reports" element={<GenerateReports />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App; 