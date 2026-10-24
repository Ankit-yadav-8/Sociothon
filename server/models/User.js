import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  role: { 
    type: String, 
    enum: ['volunteer', 'collector', 'recycler', 'admin', 'hostel', 'ngo'],
    required: true 
  },
  volunteerId: { type: String, unique: true, sparse: true },
  collectorId: { type: String },
  recyclerId: { type: String },
  vehicleNo: { type: String },
  address: { type: String },
  phone: { type: String },
  upiId: { type: String },
  isEmailVerified: { type: Boolean, default: false },
  emailVerificationToken: { type: String },
  avatar: { type: String },
  joinedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export const User = mongoose.model('User', userSchema);
export default User;
