import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  status: { type: String, required: true },
  note: { type: String }
}, { _id: false });

const deliveryProofSchema = new mongoose.Schema({
  receiptNo: { type: String },
  deliveryDate: { type: Date },
  weighbridgeGrossKg: { type: Number },
  proofPhotoUrl: { type: String },
  notes: { type: String }
}, { _id: false });

const recyclerIntakeSchema = new mongoose.Schema({
  confirmedAt: { type: Date, default: Date.now },
  recyclerName: { type: String },
  intakeSlipNo: { type: String },
  verifiedNetWeightKg: { type: Number },
  purityPercentage: { type: Number, default: 98.0 },
  inspectorName: { type: String },
  notes: { type: String },
  handoverHash: { type: String }
}, { _id: false });

const paymentSchema = new mongoose.Schema({
  utr: { type: String },
  method: { type: String, default: 'Instant UPI Auto-Credit' },
  amount: { type: Number },
  paidAt: { type: Date },
  status: { type: String, default: 'SUCCESS' }
}, { _id: false });

const collectionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  volunteerId: { type: String, required: true },
  volunteerName: { type: String, required: true },
  volunteerEmail: { type: String, required: true },
  collectorId: { type: String, required: true },
  collectorName: { type: String, required: true },
  category: { type: String, required: true },
  categoryName: { type: String, required: true },
  ratePerKg: { type: Number, required: true },
  proposedWeightKg: { type: Number, required: true },
  actualWeightKg: { type: Number },
  estimatedReward: { type: Number, required: true },
  finalReward: { type: Number },
  location: { type: String, required: true },
  status: { 
    type: String, 
    enum: [
      'PROPOSED', 
      'VOLUNTEER_ACCEPTED', 
      'VOLUNTEER_REJECTED', 
      'COLLECTED', 
      'ADMIN_APPROVED', 
      'ADMIN_REJECTED', 
      'RECYCLER_ASSIGNED', 
      'DELIVERED', 
      'DELIVERY_VERIFIED', 
      'REWARD_APPROVED', 
      'PAYMENT_PENDING', 
      'PAID'
    ],
    default: 'PROPOSED'
  },
  wastePhoto: { type: String },
  assignedRecycler: {
    id: { type: String },
    name: { type: String },
    facility: { type: String },
    cpcbReg: { type: String }
  },
  deliveryProof: deliveryProofSchema,
  recyclerIntake: recyclerIntakeSchema,
  payment: paymentSchema,
  history: [historySchema]
}, {
  timestamps: true
});

export const Collection = mongoose.model('Collection', collectionSchema);
export default Collection;
