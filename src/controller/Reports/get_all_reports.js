const Report = require("../../models/report");

const get_all_reports = async (req, res) => {
  try {
    let report_list = await Report.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      code: 200,
      message: "All Reports ",
      report: report_list,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: "Something went Wrong",
    });
  }
};

module.exports = get_all_reports;
