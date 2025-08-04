import Hospital from '../../models/medical_assistant_model/hospital.model.js';
import { ENV } from '../../config/ENV.js';

export const addHospital = async (req, res) => {
  const { hospitalName, hospitalLocation, description } = req.body;

  try {
    if (
      !hospitalName?.trim() ||
      !hospitalLocation?.trim() ||
      !description?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: 'Hospital name, location and description are required',
      });
    }

    const image = req.file?.path || null;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'Hospital image is required',
      });
    }

    const hospital = await Hospital.create({
      hospitalName,
      hospitalLocation,
      image,
      description,
    });

    res.status(201).json({
      success: true,
      message: 'Hospital added successfully',
      hospital,
    });
  } catch (error) {
    if (ENV.ENVIRONMENT !== 'production') {
      //for local development
      console.error('Hospital add error:', error);
    }
    res.status(500).json({
      success: false,
      message: 'Error adding hospital',
    });
  }
};

export const getAllHospitalData = async (req, res) => {
  try {
    const data = await Hospital.find().sort({ createdAt: -1 });
    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Hospital data is not available',
      });
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    if (ENV.ENVIRONMENT !== 'production') {
      console.error('Hospital fetch error:', error);
    }
    res.status(500).json({
      message: 'Error fetching hospital data',
      success: false,
    });
  }
};
