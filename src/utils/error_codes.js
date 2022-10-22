module.exports.RENDER_BAD_REQUEST = (res, error) => {
  console.log(error);
  return res.status(400).json({
    code: 400,
    message: "Something Went Wrong Please Contact Support",
  });
};
