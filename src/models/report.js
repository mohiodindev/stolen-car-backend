const mongoos = require("mongoose");
const _ = require("lodash");

const reportSchema = new mongoos.Schema(
  {
    report: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    action_id: {
      type: mongoos.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoos.model("report", reportSchema);
