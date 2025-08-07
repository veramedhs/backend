import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String },
  attachment: [{ type: String }], 
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;