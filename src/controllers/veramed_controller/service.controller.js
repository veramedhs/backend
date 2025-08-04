import Service from "../../models/veramed_model/service.model.js"
export const submitServiceRequest = async (req, res) => {
  try {

    // ✅ Define getFileUrl to convert uploaded path into full HTTP URL
    const getFileUrl = (req, file) => {
      const filename = file?.[0]?.filename;
      return filename ? `${req.protocol}://${req.get('host')}/uploads/${filename}` : null;
    };

    // ✅ Now use it
    const medicalReportsUrl = getFileUrl(req, req.files?.medicalReports);
    const previousRecordsUrl = getFileUrl(req, req.files?.previousRecords);
    const patientPassportUrl = getFileUrl(req, req.files?.patientPassport);
    const attendantPassportUrl = getFileUrl(req, req.files?.attendantPassport);

    

 

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
      medicalReports: medicalReportsUrl,
      previousRecords: previousRecordsUrl,
      attendantName,
      relation,
      attendantPassport: attendantPassportUrl,
      patientPassport: patientPassportUrl,
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
