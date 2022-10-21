const Report = require("../../models/report");
const { generate_csv } = require("../../utils/utils");
const generate_report_of_all_cars = async (req, res) => {
  try {
    let cars_report = await generate_csv();
    let report_obj = {
      url: cars_report.secure_url,
      public_id: cars_report.public_id,
    };
    let action_id = req.user._id;
    let action_by = req.user.type;

    let report = new Report({
      report: report_obj,
      action_id: action_id,
      action_by: action_by,
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

module.exports = generate_report_of_all_cars;
