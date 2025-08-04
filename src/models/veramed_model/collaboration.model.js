import mongoose from 'mongoose';

const collabrationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    attachment: {
      type: String,
    },
  },
  { timestamps: true }
);

const Collabration = mongoose.model('Collaboration', collabrationSchema);

export default Collabration;
