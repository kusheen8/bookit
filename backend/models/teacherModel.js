import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean },
    date: { type: Number },
    slots_booked: { type: Object, default: {} },
    
}, { minimize: false })

const teacherModel =  mongoose.model('teacherModel', teacherSchema)
    
export default teacherModel ;