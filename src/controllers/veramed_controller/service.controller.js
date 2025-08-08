import Service from "../../models/veramed_model/service.model.js";

// --- CREATE a new Service Request ---
// This is the controller you provided, for handling the public form submission.
export const submitServiceRequest = async (req, res) => {
  try {
    // This helper function processes an array of uploaded files and returns their URLs.
    const getFileUrls = (filesArray) => {
      if (!filesArray || filesArray.length === 0) {
        return []; // Return an empty array if no files were uploaded for this field
      }
      return filesArray.map(file => file.path);
    };
    
    // The files are now under keys that match the fields specified in the router's upload middleware.
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
      // Assign the arrays of URLs to the corresponding schema fields
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

// --- GET all Service Queries (for the Admin Dashboard) ---
// This controller handles fetching all entries with pagination.
export const getAllServiceQueries = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const totalServiceQueries = await Service.countDocuments();

    const serviceQueries = await Service.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: 'Service queries retrieved successfully.',
      data: serviceQueries,
      pagination: {
        total: totalServiceQueries,
        page,
        totalPages: Math.ceil(totalServiceQueries / limit),
      },
    });
  } catch (error) {
    console.error('Error retrieving service queries:', error);
    res.status(500).json({
      success: false,
      message: 'A server error occurred while retrieving service queries.',
    });
  }
};

// --- DELETE a Service Query (for the Admin Dashboard) ---
// This controller handles deleting a specific entry by its ID.
export const deleteServiceQuery = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedServiceQuery = await Service.findByIdAndDelete(id);

    if (!deletedServiceQuery) {
      return res.status(404).json({
        success: false,
        message: 'Service query not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Service query deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting service query:', error);
    res.status(500).json({
      success: false,
      message: 'A server error occurred while deleting the service query.',
    });
  }
};