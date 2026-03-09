# 📚 Library Management System

A modern, full-featured **Library Management System** built with **React.js** as part of the Software Engineering Lab at VIT University. This system provides separate, role-based interfaces for library members and librarians to efficiently manage books, users, and transactions.

---

## 🌟 Features

### 👤 For Library Members
- **User Authentication** — Secure login and registration system
- **Member Dashboard** — Overview of borrowed books, fines, and reservations
- **Search Books** — Search and filter books by title, author, or category
- **Borrow / Return** — Easy book borrowing and return process
- **Reservation System** — Reserve books that are currently unavailable
- **Loan Status** — Track current loans and due dates
- **Fine Details** — View and manage pending fines

### 👨‍💼 For Librarians
- **Admin Dashboard** — Complete overview of library statistics
- **Manage Books** — Add, update, and delete books (full CRUD)
- **Manage Users** — View and manage library members
- **Approve Requests** — Approve or reject borrow/return requests
- **Generate Reports** — Inventory, circulation, fines, and popular books reports

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React.js 18 |
| Routing | React Router DOM v6 |
| UI & Styling | Bootstrap 5, React-Bootstrap, Custom CSS |
| Icons | Bootstrap Icons |
| HTTP Client | Axios (ready for backend integration) |
| Build Tool | Create React App |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v14 or higher
- npm v6 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Nayan172005/library-management-frontend.git
cd library-management-frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app will be available at **http://localhost:3000**

---

## 🔑 Demo Credentials

| Role | Email | Password |
|---|---|---|
| 👤 Member | member@test.com | 123 |
| 👨‍💼 Librarian | admin@test.com | 123 |

---

## 📁 Project Structure

```
library-management-frontend/
├── public/
│   └── index.html
└── src/
    ├── components/
    │   ├── common/
    │   │   ├── Header.js
    │   │   ├── Sidebar.js
    │   │   └── Footer.js
    │   └── layouts/
    │       ├── MemberLayout.js
    │       └── LibrarianLayout.js
    ├── pages/
    │   ├── member/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Dashboard.js
    │   │   ├── SearchBooks.js
    │   │   ├── BorrowReturn.js
    │   │   ├── Reservation.js
    │   │   ├── LoanStatus.js
    │   │   └── FineDetails.js
    │   └── librarian/
    │       ├── AdminDashboard.js
    │       ├── ManageBooks.js
    │       ├── ManageUsers.js
    │       ├── ApproveRequests.js
    │       └── GenerateReports.js
    ├── App.js
    ├── App.css
    └── index.js
```

---

## 🎨 Design Highlights

- **Responsive Layout** — Works seamlessly on desktop, tablet, and mobile
- **Role-based Navigation** — Distinct sidebars and routes for members vs librarians
- **Clean, Modern UI** — Professional interface built with Bootstrap 5
- **Interactive Elements** — Hover effects, animations, and user feedback
- **Form Validation** — Client-side validation with clear error messages

---

## 🔧 Backend Integration

The app is structured to easily connect to a REST API. To configure the base URL, create `src/config.js`:

```js
export const API_BASE_URL = 'http://localhost:5000/api'; // Your backend URL
```

---

## 🗺️ Roadmap

- [ ] Backend with Node.js / Express
- [ ] MongoDB database integration
- [ ] Real-time notifications
- [ ] Email reminders for due dates
- [ ] QR code for book checkout
- [ ] Advanced search and filters
- [ ] Data visualization / analytics charts
- [ ] Dark mode

---

## 🤝 Contributing

Contributions are welcome! Here's how:

```bash
# 1. Fork the repo and create your branch
git checkout -b feature/your-feature-name

# 2. Commit your changes
git commit -m "Add: your feature description"

# 3. Push and open a Pull Request
git push origin feature/your-feature-name
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Nayan** — [@Nayan172005](https://github.com/Nayan172005)

---

> ⭐ If you found this project helpful, consider giving it a star!
