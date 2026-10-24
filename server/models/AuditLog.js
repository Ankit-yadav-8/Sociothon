import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  actor: { type: String, required: true },
  action: { type: String, required: true },
  target: { type: String, required: true },
  notes: { type: String },
  hash: { type: String }
}, {
  timestamps: true
});

export const AuditLog = mongoose.model('AuditLog', auditLogSchema);
export default AuditLog;
