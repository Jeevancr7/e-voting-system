# E-Voting System

A secure and user-friendly electronic voting system built with the MEAN stack (MongoDB, Express.js, Angular, Node.js). This application allows users to register, login, cast votes, and view results in a transparent and efficient manner.

## Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Role-based Access**: Different permissions for voters, administrators, and election officials
- **Real-time Voting**: Cast votes securely with encryption
- **Results Dashboard**: View live election results and statistics
- **Admin Panel**: Manage elections, candidates, and users
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/e-voting-system.git
   cd e-voting-system
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the backend directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/votingdb
   JWT_SECRET=your_jwt_secret_key
   ```

5. **Start MongoDB**
   ```bash
   # On Windows
   net start MongoDB
   # Or run mongod if not installed as service
   ```

## Usage

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   The server will run on http://localhost:5000

2. **Start the frontend**
   ```bash
   cd frontend
   npm start
   ```
   The app will be available at http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Voting
- `GET /api/votes/candidates` - Get all candidates
- `POST /api/votes/cast` - Cast a vote
- `GET /api/votes/my-vote` - Get user's vote

### Results
- `GET /api/results` - Get election results
- `GET /api/results/live` - Get live voting statistics

## Project Structure

```
e-voting-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Vote.js
│   │   └── voteModel.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── voteRoutes.js
│   │   └── resultRoutes.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── HomePage.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── VotingPage.js
│   │   │   └── ResultsPage.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Input validation and sanitization
- CORS protection
- Rate limiting (can be added)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact the development team.

---

**Note**: This is a demonstration project. In a production environment, additional security measures and compliance with election regulations would be required.
