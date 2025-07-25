import validator from "validator"
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary'
import teacherModel from '../models/teacherModel.js'
import uploadToCloudinary from "../config/cloudinary.js"
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"
import userModel from "../models/userModel.js"
//import upload from "../middlewares/multer.js"


// API fore adding Teachers
const addTeacher = async (req, res) => {

   try {

      const { name, email, password, speciality, degree, experience, about } = req.body
      const imageFile = req.file

      const result = await uploadToCloudinary(imageFile.buffer)
      console.log({ name, email, password, speciality, degree, experience, about });

      //checking for all the data to add in teachers
      if (!name || !email || !password || !speciality || !degree || !experience || !about) {
         return res.json({ success: false, message: "Missing Details" })
      }

      // validating email format
      if (!validator.isEmail(email)) {
         return res.json({ success: false, message: "Please Enter a valid email" });
      }


      //validating strong password
      if (password.length < 8) {
         return res.json({ success: false, message: "Please Enter a strong email" })
      }

      //hashing Doctor password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      //const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
      //const imageUrl = result.secure_url

      const newData = await teacherModel.create({
         name, email, password: hashedPassword, speciality, degree, experience, about, image: result.secure_url, date: Date.now()
      })

      // newData.save()
      //res.status(200).json({success :true , message : "successfully saved"})


      const newTeacher = new teacherModel(newData)
      await newTeacher.save()

      res.json({ success: true, message: "Teacher Added" })

   } catch (error) {
      //res.status(500).send(error.message)
      console.log(error)
      res.json({ success: false, message: error.message })
   }
}


const addFile = async (req, res) => {
   try {
      const image = req.file;
      console.log(image);
      if (!image) {

         return res.status(200).send({ message: "no image found" })
      }
      const result = await uploadToCloudinary(image.buffer)

      res.status(200).send({ message: "successfully added file", data: result })


   }
   catch (error) {
      res.status(400).send(error.message)
   }
}

//API For admin Login
const loginAdmin = async (req, res) => {
   try {

      const { email, password } = req.body

      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
         const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
         res.json({ success: true, token })

      } else {
         res.json({ success: false, message: "Invalid Credentials" })
      }

   } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   }
}


//Api to get all teachers list on admin panel
const allTeachers = async (req, res) => {
   try {

      const teachers = await teacherModel.find({}).select('-password')
      res.json({ success: true, teachers })

   } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   }

}

//API to get all appointments list
const appointmentsAdmin = async (req, res) => {
   try {
      const appointments = await appointmentModel.find({})
      res.json({ success: true, appointments })
   } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })

   }
}

//API for cancellation
const appointmentCancel = async (req, res) => {
  try {
    
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    const { teacherId, slotDate, slotTime } = appointmentData;
    const teacherData = await teacherModel.findById(teacherId);
    let slots_booked = teacherData.slots_booked || {};

    slots_booked[slotDate] = (slots_booked[slotDate] || []).filter(e => e !== slotTime);
    await teacherModel.findByIdAndUpdate(teacherId, { slots_booked });

    res.json({ success: true, message: 'Appointment Cancelled' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get dashboard data for admin panel
const adminDashboard = async (req,res) =>{
   try {
      
      const teachers = await teacherModel.find({})
      const users = await userModel.find({})
      const appointment = await appointmentModel.find({})

      const dashData ={
         teachers :teachers.length,
         appointment:appointment.length,
         students:users.length,
         latestAppointments: appointment.reverse().slice(0,5)
      }

      res.json({success:true,dashData})


   } catch (error) {
      console.error(error);
    res.json({ success: false, message: error.message });
   }
}

export { addTeacher, addFile, loginAdmin, allTeachers, appointmentsAdmin , appointmentCancel, adminDashboard}