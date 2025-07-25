import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import teacherModel from '../models/teacherModel.js'
import appointmentModel from '../models/appointmentModel.js'

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !password || !email) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      address:'',
      phone: '0000000000',
      gender: 'Not selected',
      dob: 'Not selected'
    }).save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get Profile
const getProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, userData: user });
  } catch (err) {
    console.error("Get Profile Error:", err);
    res.status(500).json({ success: false, message: 'Failed to fetch user profile' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
let imageUrl = user.image; // default to existing image

if (req.file && req.file.buffer) {
  imageUrl = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'users',
        width: 150,
        crop: 'scale',
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary Upload Error:', error);
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );
    stream.end(req.file.buffer);
  });
}
const parsedAddress = JSON.parse(req.body.address || '{}');
const updatedAddress = {
  line1: parsedAddress.line1 || user.address?.line1 || '',
  line2: parsedAddress.line2 || user.address?.line2 || '',
};

    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.dob = req.body.dob || user.dob;
    user.gender = req.body.gender || user.gender;
    user.image = imageUrl;
    user.address = updatedAddress;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
/* */


/*
// GET USER PROFILE
const getProfile = async (req, res) => {
  try {
    const userId = req.userId; // get from auth middleware
    const userData = await userModel.findById(userId).select('-password');

    res.json({ success: true, userData });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// UPDATE USER PROFILE
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file; // from multer

    // Basic field validation
    if (!name || !phone || !address || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    // Update basic profile info
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address,
      dob,
      gender,
    });

    // If image is uploaded, update separately
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });

      const imageUrl = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }

    res.json({ success: true, message: "Profile Updated" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
*/



// Book Appointment
const bookAppointment = async (req, res) => {
  try {
    const { teacherId, slotDate, slotTime } = req.body;
    const userData = req.user;
    const userId = userData._id;

    const teacherData = await teacherModel.findById(teacherId).select('-password');

    if (!teacherData || !teacherData.available) {
      return res.json({ success: false, message: 'Teacher not available' });
    }

    let slots_booked = teacherData.slots_booked || {};

    if (slots_booked[slotDate]?.includes(slotTime)) {
      return res.json({ success: false, message: 'Slot not available' });
    }

    if (!slots_booked[slotDate]) {
      slots_booked[slotDate] = [];
    }

    slots_booked[slotDate].push(slotTime);

    const appointmentData = {
      userId,
      teacherId,
      userData,
      teacherData,
      slotDate,
      slotTime,
      date: new Date().toISOString() ,
    };


    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    await teacherModel.findByIdAndUpdate(teacherId, { slots_booked });

    res.json({ success: true, message: 'Appointment Booked' });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

//API to get use appointmnet for frontend my-appointment page
const listAppointment = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ Use directly
    const appointments = await appointmentModel.find({ userId });

    res.json({ success: true, appointments }); // ✅ Respond with success
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message }); // ✅ Error only here
  }
};

// Api to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const userId = req.user._id;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.userId.toString() !== userId.toString()) {
      return res.json({ success: false, message: "Unauthorised action" });
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


export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
};

