// backend/middleware/auth.js
import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Replace 'your_jwt_secret' with your actual secret
    req.user = decoded; // Attach decoded user info to the request
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export default auth;
