// controllers/veramed_controller/service.controller.js
import Service from "../../models/veramed_model/service.model.js";

export const submitServiceRequest = async (req, res) => {
  try {
    // UPDATE: This helper function now processes an array of files and returns an array of URLs.
    const getFileUrls = (filesArray) => {
      if (!filesArray || filesArray.length === 0) {
        return []; // Return an empty array if no files
      }
      return filesArray.map(file => {
        const filename = file.path; // Use .path for Cloudinary or .filename for local storage
        // Example for local storage:
        // return `${req.protocol}://${req.get('host')}/uploads/${filename}`;
        return filename; // For Cloudinary, path is the full URL
      });
    };
    
    // UPDATE: The files are now under keys that match the route, e.g., 'medicalReports[]'
    const medicalReportsUrls = getFileUrls(req.files['medicalReports[]']);
    const previousRecordsUrls = getFileUrls(req.files['previousRecords[]']);
    const patientPassportUrls = getFileUrls(req.files['patientPassport[]']);
    const attendantPassportUrls = getFileUrls(req.files['attendantPassport[]']);

    const {
      serviceTitle,
      patientName,
      email,
      countryCode,
      phone,
      medicalCondition,
      hospitalName,
      attendantName,
      relation,
      message,
    } = req.body;

    const newService = new Service({
      serviceTitle,
      patientName,
      email,
      countryCode,
      phone,
      medicalCondition,
      hospitalName,
      // UPDATE: Assign the arrays of URLs to the schema fields
      medicalReports: medicalReportsUrls,
      previousRecords: previousRecordsUrls,
      attendantName,
      relation,
      attendantPassport: attendantPassportUrls,
      patientPassport: patientPassportUrls,
      message,
    });

    const savedService = await newService.save();

    res.status(201).json({
      success: true,
      message: "Service request submitted successfully.",
      data: savedService,
    });
  } catch (error) {
    console.error("Service submission error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while submitting the request.",
      error: error.message,
    });
  }
};