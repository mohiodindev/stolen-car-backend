require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { connect_db } = require("./src/database/connect_database");
const cloudinary = require("cloudinary").v2;
const bodyParser = require("body-parser");
var cron = require("node-cron");

// cron.schedule(" */1 * * * *", () => {
//   console.log("running a task every second");
// });

cloudinary.config({
  cloud_name: "dzfohgboo",
  api_key: "387528738572351",
  api_secret: "lXmcixw2P8q3MW9aQTD1y1_nDSA",
});

var indexRouter = require("./src/routes/index");
var usersRouter = require("./src/routes/users");
const carRouter = require("./src/routes/car");
const fileUpload = require("express-fileupload");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(cookieParser({}));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/car", carRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

connect_db();

module.exports = app;
