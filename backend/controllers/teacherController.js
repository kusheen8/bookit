import teacherModel from "../models/teacherModel.js";
import bcrypt from 'bcryptjs';
import jwt from'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { teacherid } = req.body;

    const teacherData = await teacherModel.findById(teacherid);
    await teacherModel.findByIdAndUpdate(teacherid, {
      available: !teacherData.available
    });

    res.json({ success: true, message: "Availability changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message }); // Also fixed 'sucess' to 'success'
  }
};

const TeacherList = async (req,res) =>{
    try{

        const teachers = await teacherModel.find({}).select(['-password','-email'])

        res.json({success:true,teachers})

    }catch(error){
    console.log(error);
    res.json({ success: false, message: error.message })

    }
}

//API for teacher login
const loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;

    const teacher = await teacherModel.findOne({ email });

    if (!teacher) {
      return res.json({ success: false, message: 'Invalid Credentials' });
    }

    // ❌ Don't use bcrypt here since password is plain text
    if (password === teacher.password) {
      const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: 'Invalid Credentials' });
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get teacher appointments for teacher panel
const appointmentsTeacher = async (req, res) => {
  try {
    const teacherId = req.teacher._id.toString(); // Ensure string comparison

    const appointments = await appointmentModel.find({ teacherId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


//API to mark appointment completed for teacher panel
const appointmentComplete = async (req,res) => {
  try {

    const teacherId = req.teacher._id.toString(); // From auth middleware
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId)

    if(appointmentData && appointmentData.teacherId === teacherId){

      await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted: true})
      return res.json({success:true,message:'Appointment Completed'})

    } else {

      return res.json({success:false,message:'Mark Failed'})
      
    }
    
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
    
  }
}


//API to cancel appointment for teacher panel
const appointmentCancel = async (req,res) => {
  try {

    const teacherId = req.teacher._id.toString(); // From auth middleware
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId)

    if(appointmentData && appointmentData.teacherId === teacherId){

      await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})
      return res.json({success:true,message:'Appointment Cancelled'})

    } else {
      
      return res.json({success:false,message:'Cancellation Failed'})
      
    }
    
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
    
  }
}

//API to get dashboard data for teacher panel
const teacherDashboard = async (req,res) => {
  try {

    const teacherId = req.teacher._id.toString();

    const appointments = await appointmentModel.find({teacherId})

    let students = []

    appointments.map((item)=>{
      if(!students.includes(item.userId)){
        students.push(item.userId)
      }
    })

    const dashData = {
      appointments: appointments.length,
      students:students.length,
      latestAppointments : appointments.reverse().slice(0,5)
    }

    res.json({success:true,dashData})

    
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
    
  }
}

// API to get Teacher profile for Teacher Panel
const teacherProfile = async  (req,res) => {
  try {
    

    const teacherId = req.teacher._id.toString();
    const profileData = await teacherModel.findById(teacherId).select('-password')

    res.json({success:true,profileData})


  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
    
  }
}

//API to update teacher profile data from teacher panel
const updateTeacherProfile = async (req,res) => {
  try {
    

    const teacherId = req.teacher._id.toString();
    const {address,available}= req.body

    await teacherModel.findByIdAndUpdate(teacherId,{address,available})

    res.json({success:true, message:'Profile Updates'})

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
    
  }
}



export { changeAvailability ,TeacherList, loginTeacher, appointmentsTeacher ,appointmentComplete, appointmentCancel, teacherDashboard, teacherProfile, updateTeacherProfile};





