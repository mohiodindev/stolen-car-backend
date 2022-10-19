const Report = require("../models/report");
const {
  upload_file_on_cloudinary,

  generate_csv,
} = require("../utils/utils");

// generate report

const generate_report_of_all_cars = async (req, res) => {
  try {
      let cars_report = await generate_csv();
      
      console.log(cars_report);

    let uplod_report = await upload_file_on_cloudinary(cars_report, "report");
    console.log(uplod_report);
    // save report in database

    let report_obj = {
      url: uplod_report.url,
      public_id: uplod_report.public_id,
    };

    let action_id = req.user._id;

    let report = new Report({
      report: report_obj,
      action_id: action_id,
    });

    await report.save();

    return res.status(200).json({
      code: 200,
      message: "Report Generated Succesfully",
      data: report,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  generate_report_of_all_cars,
};
