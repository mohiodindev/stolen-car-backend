const cloudinary = require("cloudinary").v2;
const generatePDF = require("pdfkit");
const fs = require("fs");

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

const generate_pdf = async (car_data) => {
  try {
    // find data from database and generate pdf

    for (let i = 0; i < car_data.length; i++) {
      let doc = new generatePDF();
      doc.pipe(fs.createWriteStream(`./pdfs/${car_data[i].model_number}.pdf`));
      doc.text(`Model Number: ${car_data[i].model_number}`);
      doc.text(`Chassis Number: ${car_data[i].chassis_number}`);
      doc.text(`Registration Number: ${car_data[i].registration_number}`);
      doc.text(`Engine Number: ${car_data[i].engine_number}`);
      doc.end();
    }

    // upload pdf on cloudinary

    // let pdf_upload = await cloudinary.uploader.upload("pdf_file.pdf", {
    //   folder: "pdf_file",
    // });
  } catch (error) {
    return error;
  }
};

module.exports = {
  upload_image_on_cloudinary,
  delete_image_from_cloudinary,
  generate_pdf,
};
