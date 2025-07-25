import express from 'express'
import { TeacherList ,appointmentsTeacher,loginTeacher,appointmentComplete, appointmentCancel, teacherDashboard, teacherProfile,updateTeacherProfile} from '../controllers/teacherController.js'
import authTeacher from '../middlewares/authTeacher.js'
const teacherRouter = express.Router()

teacherRouter.get('/list',TeacherList)
teacherRouter.post('/login',loginTeacher)
teacherRouter.get('/appointments',authTeacher,appointmentsTeacher)
teacherRouter.post('/complete-appointment',authTeacher,appointmentComplete)
teacherRouter.post('/cancel-appointment', authTeacher,appointmentCancel)
teacherRouter.get('/dashboard', authTeacher, teacherDashboard)
teacherRouter.get('/profile',authTeacher,teacherProfile)
teacherRouter.post('/update-profile',authTeacher,updateTeacherProfile)



export default teacherRouter