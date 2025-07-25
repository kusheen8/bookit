import express from 'express';
import { addFile, addTeacher , allTeachers, loginAdmin, appointmentsAdmin, appointmentCancel,adminDashboard } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js'; // Make sure this is correctly imported
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/teacherController.js';

const adminRouter = express.Router();

adminRouter.post("/add-teacher",authAdmin, upload.single('image'), addTeacher); // 'image' matches the frontend field name
adminRouter.post("/add-file" , upload.single('image') , addFile)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-teachers',authAdmin,allTeachers)
adminRouter.post('/change-availability',authAdmin,changeAvailability)
adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)

export default adminRouter;