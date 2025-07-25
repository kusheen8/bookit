import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  gender: { type: String, default: 'Not selected' },
  dob: { type: String, default: 'Not selected' },
  phone: { type: String, default: '0000000000' },
  address: {
  line1: { type: String, default: '' },
  line2: { type: String, default: '' },
}
});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;






