import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema(
  {
    hospitalName: {
      type: String,
      required: true,
    },
    hospitalLocation: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Hospital = mongoose.model('Hospital', hospitalSchema);

export default Hospital;
