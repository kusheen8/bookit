

import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js'; // adjust path as needed

const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    req.user = user; // attach user to request object
    next();
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export default authUser;



