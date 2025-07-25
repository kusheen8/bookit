import jwt from 'jsonwebtoken';
import teacherModel from '../models/teacherModel.js';

const authTeacher = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
    }

    const dtoken = authHeader.split(' ')[1];
    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);

    const teacher = await teacherModel.findById(decoded.id).select('-password');

    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    req.teacher = teacher; // attach teacher to request object
    next();
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export default authTeacher;
