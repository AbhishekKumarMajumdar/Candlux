import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  password: String,
  isVerified: { type: Boolean, default: false },
  otp: String,
  otpExpiry: Date,
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // ✅ Role added
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
