const Report = require("../../models/report");

const delete_reports = async (req, res) => {
  try {
    let today_date = new Date();
    let last_month_date = new Date(
      today_date.setMonth(today_date.getMonth() - 1)
    );

    let report_list = await Report.deleteMany({
      createdAt: { $lt: last_month_date },
    });

    return res.status(200).json({
      code: 200,
      message: "Reports  Deleted Succesfully",
      report: report_list,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: "Something went Wrong",
    });
  }
};

module.exports = delete_reports;
