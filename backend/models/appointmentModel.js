import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId: {type:String,required:true},
    teacherId: {type:String, required:true},
    slotDate: {type:String, required:true},
    slotTime: {type:String, required:true},
    userData: {type:Object, required:true},
    teacherData: {type:Object, required: true},
    date: {type:Date, required:true},
    cancelled: {type:Boolean, default:false},
    isCompleted: {type:Boolean, default:false}
})


const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema)
export default appointmentModel