const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const authMiddleware = async (req, res, next) => {
  try {
 
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }


    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   
    const user = await User.findById(decoded.id).select('-password'); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user; // Save user data in req.user
    next(); // Move to next middleware/route
    
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid', error: error.message });
  }
};

module.exports = authMiddleware;
