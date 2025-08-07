// models/veramed_model/collaboration.model.js
import mongoose from 'mongoose';

const collaborationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String },
  attachment: [{ type: String }],
}, { timestamps: true });

const Collabration = mongoose.model('Collabration', collaborationSchema);

export default Collabration;