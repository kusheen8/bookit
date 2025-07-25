import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import { addFile } from './controllers/adminController.js'
import teacherRouter from './routes/teacherRoute.js'
import userRouter from './routes/userRoute.js'


// app config
const app = express()
const port = process.env.PORT || 4000




//middlewares
app.use(express.json())
app.use(cors())

//api end point
app.use('/api/admin',adminRouter)
app.use('/api/teacher',teacherRouter)
app.use('/api/user',userRouter)
// localhost:4000/api/admin/add-teacher

app.get('/',(req,res)=>{
    res.send('API WORKING')
})


connectDB().then(() => app.listen( port , () => {
   console.log(`server is running on port ${port}`)
}))