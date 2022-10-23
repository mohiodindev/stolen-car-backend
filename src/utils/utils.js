const cloudinary = require("cloudinary").v2;
const generatePDF = require("pdfkit");
const fs = require("fs");
const Car = require("../models/car_model");
const { path } = require("pdfkit");
const ExcelJs = require("exceljs");
const Report = require("../models/report");
const { createTransport } = require("nodemailer");

// function to upload image

const upload_image_on_cloudinary = async (image, file_path) => {
  try {
    let image_upload = await cloudinary.uploader.upload(image, {
      folder: file_path,
    });
    return image_upload;
  } catch (error) {
    return error;
  }
};

// delete image from cloudaniry

const delete_image_from_cloudinary = async (public_id) => {
  try {
    let image_delete = await cloudinary.uploader.destroy(public_id, {
      invalidate: true,
    });
    return image_delete;
  } catch (error) {
    return error;
  }
};

// PDF GENERATE FROM DATABASE DATA

const generate_pdf = async () => {
  try {
    let cars = await Car.find().populate("user", "first_name  last_name");
    let doc = new generatePDF();
    doc.pipe(fs.createWriteStream("output.pdf"));
    doc.fontSize(25).text("Cars List", {
      align: "center",
    });

    cars.forEach((car) => {
      doc.fontSize(15).text("Car Model Number: " + car.model_number);
      doc.fontSize(15).text("Car Chieses Number: " + car.chiesses_number);
      doc
        .fontSize(15)
        .text("Car Registration Number: " + car.registration_number);
      doc.fontSize(15).text("Car Engine Number: " + car.engine_number);
      doc.fontSize(15).text("Car Image: " + car.image.url);

      doc.fontSize(15).text("Car Reported At : " + car.createdAt);
      doc
        .fontSize(15)
        .text("Car Owner: " + car.user.first_name + " " + car.user.last_name);

      doc.moveDown();
    });

    doc.end();

    // upokad pdf file to cloudinary

    let pdf_upload = await cloudinary.uploader.upload("output.pdf", {
      folder: "pdf_files",
    });

    // delete pdf file from local storage

    fs.unlinkSync("output.pdf");

    return pdf_upload;
  } catch (error) {
    return error;
  }
};

const generate_csv = async () => {
  try {
    let car = await Car.find({}).populate("user", "first_name  last_name");
    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet("Cars");

    worksheet.columns = [
      { header: "Name", key: "name", width: 30 },
      { header: "Model Number", key: "model_number", width: 30 },
      { header: "Chiesses Number", key: "chiesses_number", width: 30 },
      { header: "Engine Number", key: "engine_number", width: 30 },
      { header: "Registration Number", key: "registration_number", width: 30 },
      { header: "Owner Name", key: "Owner", width: 30 },
      { header: "Reported At", key: "createdAt", width: 30 },
      { header: "Image", key: "image", width: 30 },
    ];

    car.forEach((car) => {
      worksheet.addRow({
        model_number: car.model_number,
        chiesses_number: car.chiesses_number,
        engine_number: car.engine_number,
        registration_number: car.registration_number,
        Owner: car.user.first_name + " " + car.user.last_name,
        createdAt: car.createdAt,
        image: car.image.url,
      });
    });

    // generate csv file

    let xls = await workbook.xlsx.writeFile("cars.xlsx");

    // upload csv file to cloudinary

    let file_name = "cars.csv";
    let file_path = "csv_files";

    let csv_upload = await cloudinary.uploader.upload("cars.xlsx", {
      folder: file_path,
      filename_override: file_name,
      resource_type: "auto",
    });

    // delete csv file from local storage and temp folder

    fs.unlinkSync("cars.xlsx");

    return csv_upload;
  } catch (error) {
    console.log(error);
  }
};

// uplosd files on cloudinary

const upload_file_on_cloudinary = async (file, file_path) => {
  try {
    let file_upload = await cloudinary.uploader.upload(file, {
      folder: file_path,
    });
    return file_upload;
  } catch (error) {
    return error;
  }
};

const delete_reports = async () => {
  try {
    let today_date = new Date();
    let last_month_date = new Date(
      today_date.setMonth(today_date.getMonth() - 1)
    );
    let report = await Report.deleteMany({
      createdAt: { $lte: last_month_date },
    });

    // delete report file from cloudanry

    let delete_file_promise = await Promise.all(
      report.map(async (report) => {
        let delete_file = await cloudinary.uploader.destroy(report.public_id, {
          invalidate: true,
        });

        console.log("delete_file", delete_file);
        return delete_file;
      })
    );

    console.log("Report Deleted");
    return report;
  } catch (error) {
    return error;
  }
};
const SEND_MAIL = async (email, subject, text) => {
  try {
    const transport = createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transport.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject,
      text,
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = {
  upload_image_on_cloudinary,
  delete_image_from_cloudinary,
  generate_pdf,
  generate_csv,
  upload_file_on_cloudinary,
  delete_reports,
  SEND_MAIL,
};
